// Cortex AI — shared interactions
(() => {
  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Parallax blobs + grid + progress bar
  const blobs = [...document.querySelectorAll('.blob')];
  const grid  = document.getElementById('gridDots');
  const prog  = document.getElementById('scrollProg');
  let raf = null;
  function onScroll(){
    const y = window.scrollY;
    if (prog) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = ((y/Math.max(docH,1))*100).toFixed(2) + '%';
    }
    blobs.forEach(b => {
      const s = parseFloat(b.dataset.speed || '0.1');
      b.style.transform = `translate3d(0, ${(y*s).toFixed(1)}px, 0)`;
    });
    if(grid){ grid.style.transform = `translate3d(0, ${(-y*0.08).toFixed(1)}px, 0)`; }
    raf = null;
  }
  window.addEventListener('scroll', () => { if(!raf) raf = requestAnimationFrame(onScroll); }, {passive:true});
  onScroll();

  // Stat counters
  const counters = document.querySelectorAll('[data-count]');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.decimals|0);
      const out = el.querySelector('.counter') || el;
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = target * eased;
        out.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));

  // Mobile nav toggle (if present)
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
})();
