document.getElementById('y').textContent=new Date().getFullYear();
const tl=document.getElementById('timeline');
EXPERIENCE.forEach(j=>{const d=document.createElement('div');d.className='card job tilt';
 const org=j.link?`<a href="${j.link}" target="_blank" rel="noopener">${j.org}</a>`:j.org;
 d.innerHTML=`<span class="dot"></span><p class="jt">${j.tag||''}</p><h3>${j.role}</h3><p class="org">${org}</p>`+(j.points.length?'<ul>'+j.points.map(p=>`<li>${p}</li>`).join('')+'</ul>':'');tl.appendChild(d)});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// typed roles
const roles=['branding','social media','content creation','photo editing','web design'];let ri=0;
if(!RM)setInterval(()=>{const r=document.getElementById('role');r.classList.add('out');setTimeout(()=>{ri=(ri+1)%roles.length;r.textContent=roles[ri];r.classList.remove('out')},300)},2200);
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.card,.chips span').forEach((c,i)=>c.style.transitionDelay=i*60+'ms')}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(s=>RM?s.classList.add('in'):io.observe(s));
// progress + glow
addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
const g=document.getElementById('glow');addEventListener('pointermove',e=>{g.style.transform=`translate(${e.clientX-200}px,${e.clientY-200}px)`});
// tilt
if(!RM&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.tilt').forEach(el=>{
 el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  el.style.transform=`perspective(800px) rotateX(${-y*7}deg) rotateY(${x*9}deg) translateY(-4px)`;el.style.setProperty('--mx',(x+.5)*100+'%');el.style.setProperty('--my',(y+.5)*100+'%')});
 el.addEventListener('pointerleave',()=>el.style.transform='')});
// ripple on buttons + burst everywhere
document.addEventListener('pointerdown',e=>{
 const b=e.target.closest('.fx,.card');if(b){const r=b.getBoundingClientRect(),s=document.createElement('span');s.className='ripple';const z=Math.max(r.width,r.height)*2;
  s.style.cssText=`width:${z}px;height:${z}px;left:${e.clientX-r.left-z/2}px;top:${e.clientY-r.top-z/2}px`;b.appendChild(s);setTimeout(()=>s.remove(),650)}
 if(RM)return;for(let i=0;i<10;i++){const p=document.createElement('i');p.className='burst';const a=Math.PI*2*i/10,d=40+Math.random()*30;
  p.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;background:${['#8ea1ff','#5865F2','#c7d2ff','#5ee1ff'][i%4]}`;document.body.appendChild(p);setTimeout(()=>p.remove(),600)}});
document.querySelectorAll('.dc').forEach(b=>b.addEventListener('click',()=>{const u=b.dataset.user;navigator.clipboard?.writeText(u);b.textContent='Copied: '+u;setTimeout(()=>b.textContent='Discord: '+u,1600)}));
// count-up stats
document.querySelectorAll('.stat b').forEach(el=>{const n=+el.dataset.n;if(RM){el.textContent=n;return}
 const t0=performance.now()+700,d=1100;const f=t=>{const k=Math.min(Math.max((t-t0)/d,0),1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
