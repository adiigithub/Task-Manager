import React, { useEffect, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'


const STORAGE_KEY = 'react_task_manager_v1'

export default function App() {
const [tasks, setTasks] = useState([])
const [filter, setFilter] = useState('all')
const [search, setSearch] = useState('')


useEffect(() => {
const raw = localStorage.getItem(STORAGE_KEY)
if (raw) {
try { setTasks(JSON.parse(raw)) } catch (e) { console.error(e) }
}
}, [])


useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }, [tasks])


const addTask = (text) => setTasks(t => [{ id: Date.now().toString(36)+Math.random().toString(36).slice(2,8), text, completed:false, createdAt:new Date().toISOString() }, ...t])
const toggleTask = (id) => setTasks(t => t.map(task => task.id===id?{...task,completed:!task.completed}:task))
const deleteTask = (id) => setTasks(t => t.filter(task => task.id!==id))
const editTask = (id, text) => setTasks(t => t.map(task => task.id===id?{...task,text}:task))
const clearCompleted = () => setTasks(t => t.filter(task => !task.completed))


const filtered = tasks.filter(task => {
if (filter==='active') return !task.completed
if (filter==='completed') return task.completed
return true
}).filter(task => task.text.toLowerCase().includes(search.toLowerCase()))


return (
<div className="app-root">
<header className="app-header">
<h1>Task Manager</h1>
<div className="search-wrap"><input placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)} /></div>
</header>


<main className="app-main">
<TaskInput onAdd={addTask} />


<div className="controls">
<div className="filters">
<button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>All</button>
<button className={filter==='active'?'active':''} onClick={()=>setFilter('active')}>Active</button>
<button className={filter==='completed'?'active':''} onClick={()=>setFilter('completed')}>Completed</button>
</div>
<div>
<button onClick={clearCompleted}>Clear completed</button>
</div>
</div>


<TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
</main>


<footer className="app-footer">{tasks.length} tasks • {tasks.filter(t=>t.completed).length} completed</footer>
</div>
)
}