const U='MuhammadFaizan-prog';
document.getElementById('theme').onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('theme',r.dataset.theme)}catch(e){}};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
fetch(`https://github-contributions-api.jogruber.de/v4/${U}?y=last`).then(r=>r.json()).then(d=>{
  document.getElementById('gh-contrib').textContent=d.total.lastYear;
  const cal=document.getElementById('cal');const first=new Date(d.contributions[0].date).getDay();
  for(let i=0;i<first;i++)cal.appendChild(Object.assign(document.createElement('i'),{style:'visibility:hidden'}));
  d.contributions.forEach(c=>{const i=document.createElement('i');i.dataset.l=c.level;i.title=`${c.count} on ${c.date}`;cal.appendChild(i)});
}).catch(()=>{});
fetch(`https://api.github.com/users/${U}`).then(r=>r.json()).then(u=>{if(u.public_repos)document.getElementById('gh-repos').textContent=u.public_repos}).catch(()=>{});
const pick=['clydara-website-2026','nutrisole-frontend','ar-3d-car','3d-chess','voice','thumbforge'];
fetch(`https://api.github.com/users/${U}/repos?per_page=100&sort=updated`).then(r=>r.json()).then(rs=>{
  const box=document.getElementById('repos');
  pick.map(n=>rs.find(r=>r.name===n)).filter(Boolean).forEach(r=>{const a=document.createElement('a');a.className='repo';a.href=r.homepage||r.html_url;a.target='_blank';a.rel='noopener';a.innerHTML=`<b>${r.name}</b><span>${r.language||''}${r.homepage?' · live ↗':''}</span>`;box.appendChild(a)});
}).catch(()=>{});
