import React from 'react'
export default function ClubToggle({clubs,selected,onToggle}:{clubs:{id:string,name:string}[],selected:Set<string>,onToggle:(id:string)=>void}){ return (<div className="club-toggle">{clubs.map(c=> (<button key={c.id} className={"toggle-btn "+(selected.has(c.id)?'active':'')} onClick={()=>onToggle(c.id)}>{c.name}</button>))}</div>) }
