// Número WhatsApp (tu número)
const WHATSAPP_NUMBER = '542994152246';

/* ---------- Partículas: si canvas existe ---------- */
(function initParticles(){
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let pts = [];
  class P { constructor(){ this.x=Math.random()*w; this.y=Math.random()*h; this.r=Math.random()*1.6+0.2; this.vx=(Math.random()-0.5)*0.3; this.vy=(Math.random()-0.5)*0.3;}
    update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<-20)this.x=w+20; if(this.x>w+20)this.x=-20; if(this.y<-20)this.y=h+20; if(this.y>h+20)this.y=-20;}
    draw(){ ctx.beginPath(); ctx.fillStyle='rgba(255,255,255,0.03)'; ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); }
  }
  function init(){ pts=[]; const count = Math.max(30, Math.floor((w*h)/30000)); for(let i=0;i<count;i++) pts.push(new P()); }
  function loop(){ ctx.clearRect(0,0,w,h); for(const p of pts){ p.update(); p.draw(); } requestAnimationFrame(loop); }
  init(); loop();
  window.addEventListener('resize', ()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; init(); });
})();

/* ---------- NAV MOBILE ---------- */
document.querySelectorAll('.nav-toggle').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const nav = btn.parentElement.querySelector('.nav');
    if (nav) nav.classList.toggle('open');
  });
});

/* ---------- YEAR FOOTER ---------- */
document.querySelectorAll('#year, #year2, #year3').forEach(el => { if (el) el.textContent = new Date().getFullYear(); });

/* ---------- REVEAL (simple) ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('inview'); });
}, {threshold: 0.12});
document.querySelectorAll('.section, .card, .service-card, .hero-left, .hero-right, .section-title').forEach(el => revealObserver.observe(el));

/* ---------- FILTRO (Index select) ---------- */
const filterSelect = document.getElementById('filterSelect');
const servicesGrid = document.getElementById('servicesGrid');
if (filterSelect && servicesGrid){
  filterSelect.addEventListener('change', ()=> {
    const v = filterSelect.value;
    const cards = servicesGrid.querySelectorAll('.service-card');
    cards.forEach(c=> c.style.display = (v==='all' || c.dataset.category===v) ? '' : 'none');
  });
}

/* ---------- BUSCADOR + FILTRO en Servicios page ---------- */
const searchInput = document.getElementById('searchServices');
const filterSelectPage = document.getElementById('filterSelectPage');
const servicesGridPage = document.getElementById('servicesGridPage');

function applyFilterPage(){
  if (!servicesGridPage) return;
  const q = (searchInput?.value || '').toLowerCase();
  const cat = (filterSelectPage?.value || 'all');
  servicesGridPage.querySelectorAll('.service-card').forEach(card=>{
    const combined = ((card.dataset.title||'') + ' ' + (card.dataset.desc||'') + ' ' + (card.dataset.category||'')).toLowerCase();
    const catMatch = (cat==='all') || (card.dataset.category===cat);
    const textMatch = combined.includes(q);
    card.style.display = (catMatch && textMatch) ? '' : 'none';
  });
}
if (searchInput) searchInput.addEventListener('input', applyFilterPage);
if (filterSelectPage) filterSelectPage.addEventListener('change', applyFilterPage);

/* ---------- VER FICHA (modal universal) ---------- */
function initModal(gridSelector, modalSelectors){
  const grid = document.querySelector(gridSelector);
  const modal = document.querySelector('#serviceModal') || document.querySelector('.modal');
  if (!grid || !modal) return;

  const modalImage = modal.querySelector(modalSelectors.image) || modal.querySelector('#modalImage');
  const modalTitle = modal.querySelector(modalSelectors.title) || modal.querySelector('#modalTitle');
  const modalDesc = modal.querySelector(modalSelectors.desc) || modal.querySelector('#modalDesc');
  const modalWhats = modal.querySelector(modalSelectors.whats) || modal.querySelector('#modalWhats');
  const modalClose = modal.querySelector('.modal-close');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-btn');
    if (!btn) return;
    const card = btn.closest('.service-card');
    if (!card) return;
    const img = card.dataset.image || '';
    const title = card.dataset.title || card.querySelector('h3')?.innerText || 'Servicio';
    const desc = card.dataset.desc || card.querySelector('p')?.innerText || '';

    if (modalImage) { modalImage.src = img; modalImage.alt = title; }
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    if (modalWhats){
      modalWhats.onclick = () => {
        const text = encodeURIComponent(`Hola, me interesa: ${title}. ${desc}`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
      };
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });

  if (modalClose) modalClose.addEventListener('click', ()=>{ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', (e)=>{ if (e.target === modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }});
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }});
}

initModal('#servicesGrid', {image:'#modalImage', title:'#modalTitle', desc:'#modalDesc', whats:'#modalWhats'});
initModal('#servicesGridPage', {image:'#modalImage2', title:'#modalTitle2', desc:'#modalDesc2', whats:'#modalWhats2'});

/* ---------- CAROUSEL BÁSICO ---------- */
(function(){
  const carousel = document.getElementById('carousel');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let idx = 0;
  function show(i){
    const n = track.children.length;
    if (n===0) return;
    if (i<0) i=n-1;
    if (i>=n) i=0;
    idx = i;
    const w = track.children[0].getBoundingClientRect().width + 12;
    track.style.transform = `translateX(${-w * idx}px)`;
  }
  prev.addEventListener('click', ()=> show(idx-1));
  next.addEventListener('click', ()=> show(idx+1));
  setInterval(()=> show(idx+1), 5200);
  window.addEventListener('resize', ()=> show(idx));
})();

/* ---------- FORMULARIO CONTACTO -> WHATSAPP ---------- */
window.submitContactForm = function(){
  const name = document.getElementById('name')?.value || 'Cliente';
  const phone = document.getElementById('phone')?.value || '';
  const eventType = document.getElementById('eventType')?.value || '';
  const date = document.getElementById('date')?.value || '';
  const guests = document.getElementById('guests')?.value || '';
  const details = document.getElementById('details')?.value || '';
  let msg = `Hola, soy ${name}. `;
  if (phone) msg += `Tel: ${phone}. `;
  if (eventType) msg += `Evento: ${eventType}. `;
  if (date) msg += `Fecha: ${date}. `;
  if (guests) msg += `Invitados: ${guests}. `;
  if (details) msg += `Detalles: ${details}.`;
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
};
