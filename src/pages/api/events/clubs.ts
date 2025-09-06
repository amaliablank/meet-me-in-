import type {NextApiRequest,NextApiResponse} from 'next'
import { createClient } from '@supabase/supabase-js'
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
export default async function handler(req:NextApiRequest,res:NextApiResponse){ try{ const { data, error } = await sb.from('clubs').select('*').order('name'); if(error) throw error; res.status(200).json(data) }catch(e:any){ res.status(500).json({error:e.message}) } }
