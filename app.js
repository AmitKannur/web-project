// Simple client-side logic for admin, voting and results


// Admin page
if(document.querySelector('#createElection')){
const sel = document.getElementById('electionSelect')
const listDiv = document.getElementById('electionList')


async function load(){
const json = await call(api.list)
sel.innerHTML = ''
if(!json.elections || !json.elections.length) return listDiv.textContent='No elections yet.'
json.elections.forEach(e => {
const opt = document.createElement('option'); opt.value = e.id; opt.textContent = e.title; sel.appendChild(opt)
})
listDiv.innerHTML = json.elections.map(e=>`<div class=\"muted\">${e.title} — ${new Date(e.start).toLocaleString()} to ${new Date(e.end).toLocaleString()}</div>`).join('')
}


document.getElementById('createElection').addEventListener('submit', async (ev)=>{
ev.preventDefault()
const data = Object.fromEntries(new FormData(ev.target).entries())
data.start = new Date(data.start).toISOString(); data.end = new Date(data.end).toISOString()
const res = await call(api.create,'POST',data)
document.getElementById('createMsg').textContent = res.message || JSON.stringify(res)
ev.target.reset(); load()
})


document.getElementById('addCandidate').addEventListener('submit', async (ev)=>{
ev.preventDefault()
const data = Object.fromEntries(new FormData(ev.target).entries())
const res = await call(api.addCandidate,'POST',data)
document.getElementById('candidateMsg').textContent = res.message || JSON.stringify(res)
ev.target.reset(); load()
})


load()
}


// Vote page
if(document.getElementById('candidatesArea')){
async function loadActive(){
const json = await call(api.list)
const now = new Date()
const active = (json.elections||[]).find(e=> new Date(e.start) <= now && new Date(e.end) >= now )
const title = document.getElementById('electionTitle')
const dates = document.getElementById('electionDates')
const area = document.getElementById('candidatesArea')
if(!active){ title.textContent='No active election'; dates.textContent=''; area.innerHTML='<div class="muted">Come back when an election is active.</div>'; return }
title.textContent = a
}}