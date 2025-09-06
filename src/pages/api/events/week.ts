import type {NextApiRequest,NextApiResponse} from 'next'
import { createClient } from '@supabase/supabase-js'
const url = process.env.SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
const sb = createClient(url, key)
export default async function handler(req:NextApiRequest,res:NextApiResponse){
  const { start, end } = req.query
  if(!start || !end) return res.status(400).json({error:'missing start or end'})
  try{ const startISO = `${start}T00:00:00+00:00`; const endISO = `${end}T23:59:59+00:00`; const { data, error } = await sb.from('events').select('*').gte('start_time', startISO).lte('start_time', endISO).order('start_time'); if(error) throw error; res.status(200).json(data) }catch(err:any){ console.error(err); res.status(500).json({error:err.message}) }
}
