const { createClient } = require('@supabase/supabase-js')
function makeClient(){
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!url||!key) throw new Error('Missing SUPABASE env in scrapers')
  return createClient(url, key)
}
async function upsertClubAndEvent(client, clubName, event){
  const { data:clubRows } = await client.from('clubs').select('*').eq('name', clubName).limit(1)
  let clubId
  if(!clubRows || clubRows.length===0){
    const { data } = await client.from('clubs').insert({ name: clubName, postcode: event.postcode || null, opening_hours: event.opening_hours || null }).select()
    clubId = data && data[0] && data[0].id
  }else clubId = clubRows[0].id
  try{
    await client.from('events').insert({
      club_id: clubId,
      event_name: event.venue_name || clubName,
      start_time: event.start_time || null,
      ticket_price: event.ticket_price || null,
      genre: event.genre || null,
      source_link: event.source_url || null
    })
  }catch(err){ console.error('Insert event failed',err) }
}
module.exports = { makeClient, upsertClubAndEvent }
