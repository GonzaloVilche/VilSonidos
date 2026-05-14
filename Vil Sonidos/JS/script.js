// Basic interactions for Vil Sonidos
const WHATSAPP_NUMBER = '5492994152246'; // ajustá si querés otro

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year')?.textContent = new Date().getFullYear();

  // nav toggle for mobile
  document.getElementById('navToggle')?.addEventListener('click', ()=>{
    document.querySelector('.nav')?.classList.toggle('open');
  });

  // filter on index
  const filterSelect = document.getElementById('filterSelect');
  const servicesGrid = document.getElementById('servicesGrid');
  if(filterSelect && servicesGrid){
    filterSelect.addEventListener('change', ()=>{
      const v = filterSelect.value;
      servicesGrid.querySelectorAll('.service-card').forEach(card => {
        card.style.display = (v === 'all' || card.dataset.category === v) ? '' : 'none';
      });
    });
  }

  // modal logic (shared)
  const modal = document.getElementById('serviceModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalWhats = document.getElementById('modalWhats');

  document.body.addEventListener('click', (e)=>{
    const t = e.target;
    if(t.matches('.view-btn')){
      const card = t.closest('.service-card');
      if(!card) return;
      const img = card.dataset.image || '';
      const title = card.dataset.title || '';
      const desc = card.dataset.desc || '';
      if(modalImage){ modalImage.src = img; modalImage.alt = title; }
      if(modalTitle) modalTitle.textContent = title;
      if(modalDesc) modalDesc.textContent = desc;
      if(modalWhats){
        modalWhats.onclick = () => {
          const text = encodeURIComponent(`Hola, me interesa: ${title} — ${desc}`);
          window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
        };
      }
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
    }

    // close modal when clicking close
    if(t.matches('.modal-close') || t.matches('.modal') ) {
      if(modal) { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
    }
  });

  // close modal on ESC
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') {
      modal?.classList.remove('open');
      modal?.setAttribute('aria-hidden','true');
    }
  });

  // carousel simple
  (function(){
    const carousel = document.getElementById('carousel');
    if(!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    let idx = 0;
    function show(i){
      const n = track.children.length;
      if(n === 0) return;
      if(i < 0) i = n - 1;
      if(i >= n) i = 0;
      idx = i;
      const w = track.children[0].getBoundingClientRect().width + 12;
      track.style.transform = `translateX(${-w * idx}px)`;
    }
    prev?.addEventListener('click', ()=> show(idx-1));
    next?.addEventListener('click', ()=> show(idx+1));
    setInterval(()=> show(idx+1), 5200);
    window.addEventListener('resize', ()=> show(idx));
  })();

  // floating whatsapp opens direct
  document.getElementById('whatsappFloat')?.addEventListener('click', (e)=>{
    // link already href, no JS necessary
  });

});
