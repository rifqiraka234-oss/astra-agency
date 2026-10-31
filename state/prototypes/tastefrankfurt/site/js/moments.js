/* The moments, on GSAP with ScrollTrigger and Lenis. Their burger lands bun by bun and opens along the wave of their mark,
   their film moves along their counter as you scroll, their photos open along that wave, steam rises off their Glühwein
   urns, their dishes pass in depth. Everything has a designed still state under reduced motion, and nothing heavy runs
   off screen. */
(() => {
  const G = window.gsap, ST = window.ScrollTrigger; if (!G || !ST) return;
  G.registerPlugin(ST);
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, phone = () => innerWidth < 761;
  if (!reduced && window.Lenis) { const lenis = new Lenis({ lerp: .1 }); lenis.on('scroll', ST.update); G.ticker.add(t => lenis.raf(t * 1000)); G.ticker.lagSmoothing(0); }

  // a box opening along the wave of their mark, k from 0 (a thin slit at the top) to 1 (open)
  function waveClip(el, k, from = 'top') {
    const W = el.clientWidth, H = el.clientHeight; if (!W || !H) return;
    if (k >= 1) { el.style.clipPath = 'none'; return; }
    const a = (1 - k) * 26 + 6, edge = from === 'top' ? H * k : H * (1 - k), N = 36; let d = '';
    if (from === 'top') { d = `M0 -2H${W}`; for (let i = N; i >= 0; i--) { const x = W * i / N; d += `L${x.toFixed(1)} ${(edge + a * Math.cos(6 * Math.PI * i / N) * (1 - k * .9)).toFixed(1)}`; } }
    else { for (let i = 0; i <= N; i++) { const x = W * i / N, y = H / 2 - H / 2 * k - a * Math.cos(6 * Math.PI * i / N) * (1 - k * .9); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + Math.max(-40, y).toFixed(1); } for (let i = N; i >= 0; i--) { const x = W * i / N, y = H / 2 + H / 2 * k - a * Math.cos(6 * Math.PI * i / N) * (1 - k * .9); d += 'L' + x.toFixed(1) + ' ' + Math.min(H + 40, y).toFixed(1); } }
    el.style.clipPath = `path('${d}Z')`;
  }

  // ---------- home, their burger ----------
  const bh = $('.bh');
  if (bh) {
    const top = $('.bh-top', bh), mid = $('.bh-mid', bh), bot = $('.bh-bot', bh), burger = $('.bh-burger', bh), live = $('.bh-live', bh), notes = $$('.bh-note', bh);
    // on a phone the burger is fitted to the screen's height, between LIVE and the slot above the words at the bottom,
    // and opens no further than that slot, where "bei euch vor Ort" and then its three lines appear one at a time
    const pin = $('.bh-pin', bh), ask = $('.bh-ask', bh), lows = $$('.bh-b', bh), fitted = { s: .86, y: -50 };
    const fit = () => {
      if (!phone()) { burger.style.width = burger.style.top = ''; lows.concat(notes).forEach(e => e.style.top = e.style.bottom = ''); fitted.s = .78; fitted.y = -58; return; }
      const vh = pin.clientHeight, askTop = vh - parseFloat(getComputedStyle(ask).bottom) - ask.offsetHeight;
      const liveH = innerWidth * .96 * 400 / 1500, liveBot = parseFloat(getComputedStyle(live).top) + liveH / 2, slot = askTop - 12 - 42, floor = slot - 10;
      const W = Math.min(innerWidth * 1.24, (floor - (liveBot - liveH * .2)) / .927 * 1350 / 1150), H = W * 1150 / 1350;
      burger.style.width = W + 'px'; burger.style.top = (floor - .465 * H) + 'px';
      fitted.s = Math.max(.6, Math.min(.86, (floor - (liveBot - liveH * .5)) / (1.334 * H)));
      fitted.y = -50 + ((floor - .638 * fitted.s * H) - (floor - .465 * H)) / H * 100;
      lows.concat(notes).forEach(e => { e.style.top = slot + 'px'; e.style.bottom = 'auto'; });
    };
    fit(); ST.addEventListener('refreshInit', fit);
    if (reduced) {
      // still, the finished state, the burger open along their wave with its lines beside it
      const ph = phone();
      G.set(burger, { x: 0, y: 0, xPercent: -50, yPercent: fitted.y, scale: fitted.s }); G.set(live, { scale: .94 });
      G.set(top, { yPercent: ph ? -52 : -62, rotate: -5 }); G.set(bot, { yPercent: ph ? 42 : 44, rotate: 4 }); G.set(mid, { scale: 1.04 });
      G.set('.bh-w1', { yPercent: ph ? -120 : -150 }); G.set('.bh-w2', { yPercent: ph ? 110 : 130 });
      G.set(notes, { opacity: ph ? 0 : 1 }); G.set('.bh-wave path', { strokeDashoffset: 0 });
    }
    else {
      // it lands, bun by bun, the way it gets built at their counter. On a phone it is there from the first paint and only
      // settles, the script often comes late on a phone and the burger is never hidden to wait for it
      if (!phone()) {
        G.from(bot, { yPercent: -180, opacity: 0, duration: .9, ease: 'bounce.out', delay: .15 });
        G.from(mid, { yPercent: -260, opacity: 0, duration: .9, ease: 'bounce.out', delay: .45 });
        G.from(top, { yPercent: -340, rotate: -8, opacity: 0, duration: 1, ease: 'bounce.out', delay: .75 });
        G.from(live, { yPercent: 14, opacity: 0, duration: 1.1, ease: 'expo.out', delay: .05 });
        G.from('.bh-a, .bh-b, .bh-ask', { y: 24, opacity: 0, duration: .9, ease: 'expo.out', delay: .9, stagger: .08 });
      } else {
        G.from(top, { yPercent: -16, duration: .9, ease: 'bounce.out', delay: .1 });
        G.from(mid, { yPercent: -8, duration: .8, ease: 'bounce.out', delay: .05 });
      }
      // scrolling, it steps back, then opens along their wave, their own lines between the layers
      const ph = phone();
      if (ph) G.set(notes, { y: 14 }); else { G.set(notes[0], { x: 30 }); G.set(notes[1], { x: -30 }); G.set(notes[2], { x: 30 }); }
      // the CSS centres it with translate(-50%, -50%), said again here so every tween keeps that centre
      G.set(burger, { x: 0, y: 0, xPercent: -50, yPercent: -50 });
      const open = G.timeline({ scrollTrigger: { trigger: bh, start: 'top top', end: 'bottom bottom', scrub: .8, invalidateOnRefresh: true } })
        .fromTo(burger, { scale: 1, yPercent: -50 }, { scale: () => fitted.s, yPercent: () => fitted.y, ease: 'none', duration: .35 }, 0)
        .fromTo(live, { scale: 1.04 }, { scale: .94, ease: 'none', duration: .35 }, 0)
        .to(top, { yPercent: ph ? -52 : -62, rotate: -5, ease: 'power2.inOut', duration: .45 }, .35)
        .to(bot, { yPercent: ph ? 42 : 44, rotate: 4, ease: 'power2.inOut', duration: .45 }, .35)
        .to(mid, { scale: 1.04, ease: 'power2.inOut', duration: .45 }, .35)
        .to('.bh-w1', { yPercent: ph ? -120 : -150, ease: 'power2.inOut', duration: .45 }, .35)
        .to('.bh-w2', { yPercent: ph ? 110 : 130, ease: 'power2.inOut', duration: .45 }, .35)
        .to('.bh-wave path', { strokeDashoffset: 0, ease: 'none', duration: .3, stagger: .06 }, .5)
        .to('.bh-a, .bh-b', { yPercent: -40, opacity: 0, ease: 'none', duration: .3 }, .35);
      if (ph) notes.forEach((n, i) => { open.to(n, { opacity: 1, y: 0, ease: 'power2.out', duration: .07 }, .66 + i * .11); if (i < 2) open.to(n, { opacity: 0, y: -14, ease: 'power2.in', duration: .05 }, .74 + i * .11); });
      else open.to(notes, { opacity: 1, x: 0, ease: 'power2.out', duration: .2, stagger: .07 }, .62);
      // the cursor turns it a little, each layer at its own depth
      if (!ph) {
        const d = [[top, 22], [mid, 12], [bot, 6]].map(([el, k]) => [G.quickTo(el, 'x', { duration: .6, ease: 'power3' }), G.quickTo(el, 'rotationY', { duration: .6, ease: 'power3' }), k]);
        const lx = G.quickTo(live, 'x', { duration: .9, ease: 'power3' });
        bh.addEventListener('pointermove', e => { const u = e.clientX / innerWidth - .5; d.forEach(([x, r, k]) => { x(u * k * 2); r(u * k * .6); }); lx(-u * 30); });
      }
    }
  }

  // ---------- home, their film along their counter ----------
  $$('.live').forEach(sec => {
    const cv = $('.live-film', sec), ctx = cv.getContext('2d'), N = +cv.dataset.frames || 68, frames = new Array(N);
    const say = $$('.live-say > span', sec), cnt = $('.live-count', sec);
    const dir = () => phone() ? '640' : '1120';
    let W = 0, H = 0, dpr = 1, shown = -1, cur = 0, loading = false;
    const src = i => `/media/film/scrub/${dir()}/f${String(i + 1).padStart(3, '0')}.webp`;
    function size() { dpr = Math.min(devicePixelRatio || 1, 1.5); W = cv.clientWidth; H = cv.clientHeight; cv.width = Math.max(2, W * dpr); cv.height = Math.max(2, H * dpr); shown = -1; drawF(cur); }
    function drawF(i) {
      i = Math.max(0, Math.min(N - 1, Math.round(i)));
      if (!(frames[i] && frames[i].naturalWidth)) for (let k = i; k >= 0; k--) if (frames[k] && frames[k].naturalWidth) { i = k; break; }
      const f = frames[i]; if (!f || !f.naturalWidth || i === shown) return; shown = i;
      // the top tenth of every frame is never drawn, the last frames carry a tent banner there
      const top = f.naturalHeight * .1, sh = f.naturalHeight - top, s = Math.max(W / f.naturalWidth, H / sh), w = f.naturalWidth * s, h = sh * s;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.drawImage(f, 0, top, f.naturalWidth, sh, (W - w) * .5, (H - h) * .45, w, h);
      sec.classList.add('has-frames');
    }
    const one = i => new Promise(r => { const im = new Image(); im.decoding = 'async'; im.onload = im.onerror = () => r(); im.src = src(i); frames[i] = im; });
    function load() { if (loading) return; loading = true; one(0).then(() => { size(); let i = 1; const next = () => { if (i >= N) return; const b = []; for (let k = 0; k < 6 && i < N; k++, i++) b.push(one(i)); Promise.all(b).then(next); }; if (!reduced) next(); }); }
    new IntersectionObserver(es => { if (es[0].isIntersecting) load(); }, { rootMargin: '150% 0px' }).observe(sec);
    addEventListener('resize', size, { passive: true });
    const open = { k: reduced ? 1 : 0 }; const clip = () => waveClip(cv, open.k, 'mid');
    G.set(say.slice(1), { yPercent: 115 });
    if (reduced) { clip(); return; }
    clip();
    ST.create({ trigger: sec, start: 'top 70%', once: true, onEnter: () => G.to(open, { k: 1, duration: 1.5, ease: 'expo.inOut', onUpdate: clip }) });
    const tl = G.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: .5,
      onUpdate: st => { cur = st.progress * (N - 1); drawF(cur); const k = Math.min(3, Math.floor(st.progress * 4)); cnt.textContent = '0' + (k + 1) + ' / 04'; } } });
    say.forEach((s, i) => { if (!i) return; tl.to(say[i - 1], { yPercent: -115, ease: 'power3.inOut', duration: .08 }, i * .25 - .04).to(s, { yPercent: 0, ease: 'power3.inOut', duration: .08 }, i * .25 - .04); });
    tl.to({}, { duration: .01 }, 1);
  });

  // ---------- page openings and story photos, opened along their wave ----------
  $$('[data-wave-open]').forEach(el => {
    const box = el.matches('.ph') ? $('.ph-photo', el) : el, ph = el.closest('.ph');
    if (!box) return;
    const o = { k: reduced ? 1 : 0 }, clip = () => waveClip(box, o.k, 'top');
    if (reduced) { clip(); ph && ph.classList.add('is-lit'); return; }
    clip(); addEventListener('resize', clip, { passive: true });
    const go = () => G.to(o, { k: 1, duration: 1.6, ease: 'expo.inOut', onUpdate: clip, onComplete: () => ph && ph.classList.add('is-lit') });
    if (ph) G.delayedCall(.35, go); else ST.create({ trigger: el, start: 'top 82%', once: true, onEnter: go });
    const img = $('img', box); if (img) G.fromTo(img, { scale: 1.14 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  if (!reduced) G.from('.ph-text > *', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: .1, delay: .1 });

  // ---------- their photos drift a little slower than the page ----------
  if (!reduced) $$('.ch-photo img, .team-photo img, .priv-photo img').forEach(img => G.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: img.closest('.ch-photo, .team-photo, .priv-photo'), start: 'top bottom', end: 'bottom top', scrub: true } }));

  // ---------- /referenzen/, their burger builds a layer for each case without a photo, the bottom bun already there ----------
  $$('[data-trio]').forEach(t => {
    if (reduced) return;
    const arts = $$('.story', t); t.dataset.step = '1';
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) t.dataset.step = String(Math.max(+t.dataset.step, arts.indexOf(e.target) + 1)); }), { rootMargin: '-30% 0px -30% 0px' });
    arts.forEach(x => io.observe(x));
  });

  // ---------- their dishes pass in depth ----------
  $$('[data-fly]').forEach(sec => {
    const dishes = $$('.fly-dish', sec); if (reduced) return;
    const tl = G.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: .8 } });
    dishes.forEach((d, i) => { const k = +d.dataset.depth || 1, dx = (parseFloat(d.style.left) - 50) / 50, dy = (parseFloat(d.style.top) - 50) / 50;
      tl.fromTo(d, { xPercent: -50 - dx * 40, yPercent: -50 - dy * 20 + 24 * k, scale: .85, rotate: -14 * dx, opacity: 1 }, { xPercent: -50 + dx * 40 * k, yPercent: -50 + dy * 30 * k - 45 * k, scale: 1 + .25 * k, rotate: 10 * dx, opacity: 1, ease: 'none', duration: 1 }, i * .04); });
    tl.from($('.fly-text', sec), { scale: .9, opacity: 0, duration: .3, ease: 'power2.out' }, .05);
  });

  // ---------- steam off their Glühwein urns ----------
  $$('.steam').forEach(cv => {
    const box = cv.parentElement, img = $('img', box), ctx = cv.getContext('2d'); if (reduced || !img) return;
    const src = (cv.dataset.steam || '').split(';').map(p => p.split(',').map(Number)), pos = (cv.dataset.pos || '0.5,0.5').split(',').map(Number);
    let W = 0, H = 0, run = false, last = 0; const puffs = [];
    const sprite = document.createElement('canvas'); sprite.width = sprite.height = 64; { const x = sprite.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,248,238,.55)'); g.addColorStop(.45, 'rgba(255,246,234,.2)'); g.addColorStop(1, 'rgba(255,246,234,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); }
    function size() { W = box.clientWidth; H = box.clientHeight; cv.width = W; cv.height = H; }
    // where a point of the photo lands inside its cover crop
    function at([u, v]) { const iw = img.naturalWidth || 1600, ih = img.naturalHeight || 1200, s = Math.max(W / iw, H / ih); const y0 = parseFloat(getComputedStyle(img).transform.split(',')[5]) || 0; return [(W - iw * s) * pos[0] + u * iw * s, (H - ih * s) * pos[1] + v * ih * s + y0, s]; }
    function frame(now) {
      if (!run) return; const dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
      ctx.clearRect(0, 0, W, H);
      src.forEach(p => { if (Math.random() < dt * 7) { const [x, y, s] = at(p); puffs.push({ x: x + (Math.random() - .5) * 20 * s, y, age: 0, life: 2.6 + Math.random() * 1.6, vx: (Math.random() - .5) * 12, r0: (14 + Math.random() * 10) * s * 2 }); } });
      ctx.globalCompositeOperation = 'screen';
      for (let i = puffs.length - 1; i >= 0; i--) { const p = puffs[i]; p.age += dt; p.y -= (26 + p.age * 8) * dt; p.x += p.vx * dt; if (p.age > p.life) { puffs.splice(i, 1); continue; }
        const q = p.age / p.life, r = p.r0 * .6 + q * 90; ctx.globalAlpha = Math.sin(Math.PI * q) * Math.min(1, q * 4) * .5; ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2); }
      ctx.globalAlpha = 1; requestAnimationFrame(frame);
    }
    size(); addEventListener('resize', size, { passive: true });
    new IntersectionObserver(es => { const on = es[0].isIntersecting; if (on && !run) { run = true; last = 0; requestAnimationFrame(frame); } else if (!on) run = false; }).observe(box);
  });

  // ---------- the rest settle in from below as they arrive ----------
  if (!reduced) $$('.cases-h, .place-head > *, .eat-top > *, .price-grid > div > h2, .team-text h2, .priv-text > *, .names ul li').forEach(el => G.from(el, { y: 40, opacity: 0, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
  if (document.readyState === 'complete') ST.refresh(); else addEventListener('load', () => ST.refresh());
})();
