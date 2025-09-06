const fs = require('fs')
const path = require('path')
const { makeClient, upsertClubAndEvent } = require('./lib/supabaseInsert')
async function run(){
  const client = makeClient()
  const clubsDir = path.join(__dirname, 'clubs')
  const files = fs.readdirSync(clubsDir).filter(f => f.endsWith('.js'))
  for(const file of files){
    const id = file.replace('.js','')
    try{
      const mod = require(path.join(clubsDir, file))
      if(!mod || typeof mod.scrape !== 'function') { console.warn('invalid scraper', file); continue }
      console.log('Running scraper for', mod.name || id)
      const events = await mod.scrape()
      for(const e of events){
        await upsertClubAndEvent(client, mod.name || id, e)
      }
    }catch(err){
      console.error('Scraper failure', id, err && err.message)
    }
  }
}
run().then(()=> console.log('Done')).catch(e=> console.error(e))
