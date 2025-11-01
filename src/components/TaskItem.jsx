import React, { useState } from 'react'
export default function TaskItem({ task, onToggle, onDelete, onEdit }){
const [editing,setEditing]=useState(false)
const [text,setText]=useState(task.text)
const save = ()=>{ const v=text.trim(); if(!v) return; onEdit(task.id,v); setEditing(false) }
return (
<li className={`task-item ${task.completed? 'completed':''}`}>
<label className="checkbox"><input type="checkbox" checked={task.completed} onChange={()=>onToggle(task.id)} /></label>
{editing? (
<div className="edit-wrap"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&save()} /><button onClick={save}>Save</button><button className="muted" onClick={()=>{setEditing(false); setText(task.text)}}>Cancel</button></div>
) : (
<>
<div className="task-text" onDoubleClick={()=>setEditing(true)}>{task.text}</div>
<div className="item-actions"><button onClick={()=>setEditing(true)}>Edit</button><button className="danger" onClick={()=>onDelete(task.id)}>Delete</button></div>
</>
)}
</li>
)
}