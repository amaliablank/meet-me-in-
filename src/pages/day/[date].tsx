import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useEffect,useState } from 'react'
import EventCard from '../../components/EventCard'

export default function DayPage(){
  const router = useRouter(); const { date } = router.query; const [events,setEvents]=useState<any[]>([])
  useEffect(()=>{ if(!date) return; fetch('/api/events/day?date='+date).then(r=>r.json()).then(data=> setEvents(data||[])) },[date])
  return (<Layout><h2>Events — {date}</h2><div>{events.length===0 ? <div style={{color:'var(--muted)'}}>No events found for this day.</div> : events.map(e=> <EventCard key={e.id} e={e} />)}</div></Layout>)
}
