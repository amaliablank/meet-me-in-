import type {NextApiRequest,NextApiResponse} from 'next'
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
const sb = createClient(url, key)
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const { date } = req.query
  if(!date) return res.status(400).json({error:'missing date'})
  const start = `${date}T00:00:00+00:00`; const end = `${date}T23:59:59+00:00`
  try{ const { data, error } = await sb.from('events').select('*').gte('start_time', start).lte('start_time', end).order('start_time', {ascending:true}); if(error) throw error; res.status(200).json(data) }catch(err:any){ console.error(err); res.status(500).json({error:err.message}) }
}
