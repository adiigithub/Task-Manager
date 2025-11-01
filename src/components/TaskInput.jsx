import React, { useState } from 'react'
export default function TaskInput({ onAdd }){
const [text,setText]=useState('')
const submit = e => { e.preventDefault(); const v=text.trim(); if(!v) return; onAdd(v); setText('') }
return (
<form className="task-input" onSubmit={submit}>
<input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a new task and press Enter" />
<button type="submit">Add</button>
</form>
)
}