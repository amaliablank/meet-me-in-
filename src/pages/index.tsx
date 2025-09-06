import Layout from '../components/Layout'
import { useState,useEffect } from 'react'
import { weekStart, daysOfWeek, isoDate } from '../utils/dates'
import { supabase } from '../lib/supabaseClient'
import EventCard from '../components/EventCard'
import ClubToggle from '../components/ClubToggle'
import Link from 'next/link'

export default function Home(){
  const today = new Date()
  const [viewDate,setViewDate] = useState(today)
  const [week,setWeek] = useState<Date[]>([])
  const [clubs,setClubs] = useState<any[]>([])
  const [selectedClubs,setSelectedClubs] = useState<Set<string>>(new Set())
  const [eventsByDay,setEventsByDay] = useState<Record<string, any[]>>({})

  useEffect(()=> setWeek(daysOfWeek(weekStart(viewDate))),[viewDate])
  useEffect(()=> supabase.from('clubs').select('*').then(r=> r.data && setClubs(r.data)),[])
  useEffect(()=>{
    const start = week[0]; const end = week[6]; if(!start) return
    const qs = new URLSearchParams({start: isoDate(start), end: isoDate(end)})
    fetch('/api/events/week?'+qs.toString()).then(r=>r.json()).then(data=>{
      const map:Record<string, any[]> = {}
      (data || []).forEach((e:any)=>{ const day = new Date(e.start_time).toISOString().slice(0,10); map[day]=map[day]||[]; map[day].push(e) })
      setEventsByDay(map)
    })
  },[week])

  function toggleClub(id:string){ const copy=new Set(selectedClubs); copy.has(id)?copy.delete(id):copy.add(id); setSelectedClubs(copy) }
  function prevWeek(){ const c=new Date(viewDate); c.setDate(viewDate.getDate()-7); if(c.getMonth()===viewDate.getMonth()) setViewDate(c) }
  function nextWeek(){ const c=new Date(viewDate); c.setDate(viewDate.getDate()+7); if(c.getMonth()===viewDate.getMonth()) setViewDate(c) }

  return (<Layout><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{display:'flex',gap:10,alignItems:'center'}}><button onClick={prevWeek}>◀</button><h2>{viewDate.toLocaleString(undefined,{month:'long', year:'numeric'})}</h2><button onClick={nextWeek}>▶</button></div><div style={{width:300}}><ClubToggle clubs={clubs} selected={selectedClubs} onToggle={toggleClub} /></div></div><div className="week-grid">{week.map(d=>{ const key=d.toISOString().slice(0,10); const events=(eventsByDay[key]||[]).filter(e=> selectedClubs.size? selectedClubs.has(e.club_id):true); return (<Link key={key} href={`/day/${key}`}><a className="day-card"><div style={{display:'flex',justifyContent:'space-between'}}><strong>{d.toLocaleDateString(undefined,{weekday:'short'})}</strong><span>{d.getDate()}</span></div><div style={{marginTop:8}}>{events.length===0 ? <div style={{color:'var(--muted)'}}>No events</div> : events.slice(0,3).map(ev=> <EventCard key={ev.id} e={ev} />)}</div></a></Link>) })}</div></Layout>)
}
