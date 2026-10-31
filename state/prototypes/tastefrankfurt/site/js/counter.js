/* Their dishes on their counter. Photo 075, their two counters and their team. The dishes of the chosen line, cut out of
   their own photos, fall onto the oak top with real physics (Matter.js, loaded only when the counter comes near), bounce
   and settle. Choose another line and they fly off and the new ones land. Throw one onto the chalk board and it goes into
   the enquiry. Under reduced motion they're simply placed on the counter. */
(() => {
  const box = document.querySelector('[data-counter]'); if (!box) return;
  const world = box.querySelector('.counter-world'), board = box.querySelector('.chalk'), photo = box.querySelector('picture img');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // each line's dishes, the cut out file, its width on a 1440 screen and what it is on their /menues/ page
  const SETS = {
    american: [['burger', 230, 'speisen', 'Black Angus Beef Burger'], ['plate', 300, 'speisen', 'Black Angus Beef Burger'], ['poffertjes', 150, 'desserts', 'Poffertjes']],
    french: [['flammkuchen', 290, 'speisen', 'Flammkuchen Elsässer Art'], ['dessert', 200, 'desserts', 'Waffeln']],
    fusion: [['bowl-b', 200, 'speisen', 'Knackige Bowls & Cous-Cous'], ['bowl-a', 180, 'speisen', 'Knackige Bowls & Cous-Cous'], ['schaschlik', 230, 'speisen', 'Mariniertes Schaschlik'], ['glaeser', 230, 'desserts', 'Diverse Desserts im Weckglas']],
  };
  SETS.start = [SETS.american[0], SETS.fusion[0], SETS.french[0], SETS.french[1]];
  const AR = { burger: .852, plate: .32, poffertjes: 1.184, flammkuchen: .81, dessert: .773, 'bowl-b': .767, 'bowl-a': .964, schaschlik: .584, glaeser: .427 };
  // their oak counter top in photo 075, measured on the photo at 1000 px wide
  const TOP_DESK = [[60, 448], [395, 479], [1000, 566]], TOP_PHONE = [[0, 505], [1000, 600]];
  let M = null, engine = null, W = 0, H = 0, items = [], statics = [], started = false, on = false, last = 0;

  function load() {
    if (window.Matter) return Promise.resolve();
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = '/js/vendor/matter.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }
  const phone = () => innerWidth < 761;
  function toScreen([x, y]) { const iw = 1000, ih = 750, s = Math.max(W / iw, H / ih); return [(W - iw * s) * .5 + x * s, (H - ih * s) * .62 + y * s]; }
  function build() {
    const { Bodies, Composite } = M;
    statics.forEach(b => Composite.remove(engine.world, b)); statics = [];
    const TOP = phone() ? TOP_PHONE : TOP_DESK;
    for (let i = 0; i < TOP.length - 1; i++) { const [x1, y1] = toScreen(TOP[i]), [x2, y2] = toScreen(TOP[i + 1]), len = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1);
      statics.push(Bodies.rectangle((x1 + x2) / 2 + Math.sin(a) * 30, (y1 + y2) / 2 + Math.cos(a) * 30 - 6, len + 60, 60, { isStatic: true, angle: a, friction: 1 })); }
    statics.push(Bodies.rectangle(-30, H / 2, 60, H * 3, { isStatic: true }), Bodies.rectangle(W + 30, H / 2, 60, H * 3, { isStatic: true }), Bodies.rectangle(W / 2, H + 60, W * 3, 120, { isStatic: true }));
    Composite.add(engine.world, statics);
  }
  function add([n, w0, group, name], i, count) {
    const { Bodies, Body, Composite } = M;
    const k = phone() ? .55 : Math.min(1.2, W / 1440), w = w0 * k, h = w * AR[n];
    const el = new Image(); el.className = 'dish'; el.src = `/media/cut/${n}-640.webp`; el.alt = ''; el.decoding = 'async'; el.style.width = w + 'px'; el.draggable = false;
    world.appendChild(el);
    const x = W * (phone() ? .2 + .6 * (i + .5) / count : .34 + .58 * (i + .5) / count), y = reduced ? H * .4 : -h - 40 - i * 90;
    const b = Bodies.rectangle(x, y, w * .9, h * .8, { chamfer: { radius: Math.min(w, h) * .3 }, restitution: .34, friction: .7, frictionAir: .012, density: .002 });
    Body.setAngle(b, (Math.random() - .5) * .5); Composite.add(engine.world, b);
    const it = { b, el, w, h, group, name }; items.push(it); return it;
  }
  function drop(line) {
    const { Body, Composite } = M;
    // the old dishes fly off the counter, up and out
    items.forEach(it => { Body.setVelocity(it.b, { x: (Math.random() - .5) * 30, y: -22 - Math.random() * 10 }); Body.setAngularVelocity(it.b, (Math.random() - .5) * .4); it.leaving = true; const old = it; setTimeout(() => { Composite.remove(engine.world, old.b); old.el.remove(); items = items.filter(x => x !== old); }, reduced ? 0 : 1400); });
    const set = SETS[line] || SETS.start;
    set.forEach((d, i) => setTimeout(() => add(d, i, set.length), reduced ? 0 : 420 + i * 260));
    if (reduced) setTimeout(() => { for (let i = 0; i < 240; i++) M.Engine.update(engine, 16); place(); }, 10);
  }
  function place() { for (const it of items) { const p = it.b.position; it.el.style.transform = `translate(${(p.x - it.w / 2).toFixed(1)}px, ${(p.y - it.h / 2).toFixed(1)}px) rotate(${it.b.angle.toFixed(3)}rad)`; } }
  function tick(now) { if (!on) return; const dt = Math.min(32, now - (last || now)); last = now; M.Engine.update(engine, dt || 16); place(); requestAnimationFrame(tick); }
  const overBoard = it => { const r = board.getBoundingClientRect(), hr = box.getBoundingClientRect(), x = it.b.position.x + hr.left, y = it.b.position.y + hr.top; return x > r.left - 40 && x < r.right + 40 && y > r.top - 60 && y < r.bottom + 40; };
  function controls() {
    const { Mouse, MouseConstraint, Composite, Events, Body } = M;
    if (!phone()) {
      const mouse = Mouse.create(world); world.style.pointerEvents = 'auto'; world.style.cursor = 'grab';
      ['mousewheel', 'DOMMouseScroll', 'wheel'].forEach(ev => mouse.element.removeEventListener(ev, mouse.mousewheel));
      const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: .18, render: { visible: false } } }); Composite.add(engine.world, mc);
      let held = null;
      Events.on(mc, 'startdrag', e => { held = items.find(i => i.b === e.body); world.style.cursor = 'grabbing'; });
      Events.on(mc, 'mousemove', () => { if (held) board.classList.toggle('is-hot', overBoard(held)); });
      Events.on(mc, 'enddrag', e => { const it = items.find(i => i.b === e.body); held = null; world.style.cursor = 'grab'; board.classList.remove('is-hot'); if (!it || !overBoard(it) || !window.tfState) return;
        const S = window.tfState.get(), list = [...(S[it.group] || [])]; if (!list.includes(it.name)) list.push(it.name); window.tfState.set({ [it.group]: list }, 'counter'); Body.setVelocity(e.body, { x: -14, y: -12 }); });
    } else {
      box.addEventListener('click', e => { const hr = box.getBoundingClientRect(), x = e.clientX - hr.left, y = e.clientY - hr.top; let best = null, bd = 1e9; items.forEach(it => { const d = Math.hypot(it.b.position.x - x, it.b.position.y - y); if (d < bd) { bd = d; best = it; } }); if (best && bd < 160) Body.setVelocity(best.b, { x: (Math.random() - .5) * 12, y: -14 }); });
    }
  }
  function start() {
    if (started) return; started = true;
    load().then(() => {
      M = window.Matter; engine = M.Engine.create({ gravity: { y: 1.1 } }); W = box.clientWidth; H = box.clientHeight; build(); controls();
      const S = window.tfState ? window.tfState.get() : {}; drop(S.linie);
      document.addEventListener('tf:state', e => { if (e.detail.patch && 'linie' in e.detail.patch) drop(e.detail.patch.linie); });
      addEventListener('resize', () => { W = box.clientWidth; H = box.clientHeight; build(); }, { passive: true });
      if (on) { last = 0; requestAnimationFrame(tick); }
    }).catch(() => box.classList.add('no-physics'));
  }
  new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v) start(); const was = on; on = v; if (on && !was && M) { last = 0; requestAnimationFrame(tick); } }, { rootMargin: '10% 0px' }).observe(box);
})();
