/* The plan's two controls. The evening, step by step, today beside the new site. What one company party is worth,
   from their own published prices, turnover and never profit, the minimum order as a visible floor. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  let D = {}; try { D = JSON.parse($('#plan-data').textContent); } catch (e) {}
  const eur = n => Math.round(n).toLocaleString('en-GB') + ' €';

  // the evening
  $$('[data-evening]').forEach(sec => {
    const tabs = $$('[data-step]', sec), panes = $$('[data-pane]', sec);
    const go = i => { tabs.forEach((t, k) => t.setAttribute('aria-selected', String(k === i))); panes.forEach((p, k) => { p.hidden = k !== i; }); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => go(i)); t.addEventListener('keydown', e => { if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); const n = (i + 1) % tabs.length; tabs[n].focus(); go(n); } if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i - 1 + tabs.length) % tabs.length; tabs[n].focus(); go(n); } }); });
  });

  // what one party is worth, their own band, the minimum order as the floor
  const worth = { one: g => Math.max(D.prices.minimum_order_net_eur, g.guests * g.pp), season: g => worth.one(g) * g.events };
  window.planWorth = worth;
  $$('[data-worth]').forEach(sec => {
    const rg = $('[name="w-guests"]', sec), rp = $('[name="w-pp"]', sec), re = $('[name="w-events"]', sec), svg = $('.worth-graph', sec);
    function draw() {
      const g = { guests: +rg.value, pp: +rp.value, events: +re.value }, one = worth.one(g), season = worth.season(g);
      rg.nextElementSibling.textContent = g.guests; rp.nextElementSibling.textContent = g.pp + ' €'; re.nextElementSibling.textContent = g.events;
      $('[data-out="one"]', sec).textContent = eur(one); $('[data-out="season"]', sec).textContent = eur(season);
      // under one party the site is a share of it, over one it is a number of parties
      const k = D.price_eur / one;
      $('[data-out="site"]', sec).textContent = D.price_eur ? (k < 1 ? `The whole site is ${eur(D.price_eur)}, ${Math.round(k * 100)} percent of the turnover of one party like this one.` : `The whole site is ${eur(D.price_eur)}, the turnover of about ${k.toFixed(1)} parties like this one.`) : 'With your own numbers, what each extra company party brings in.';
      // one bar per party in the season, the minimum order drawn as a floor across them
      const W = 600, H = 200, n = g.events, max = Math.max(one, 1) * 1.15, bw = Math.min(60, (W - 20) / n - 10), y = v => H - 24 - v / max * (H - 40);
      let s = `<rect class="floor" x="0" y="${y(D.prices.minimum_order_net_eur).toFixed(1)}" width="${W}" height="${(H - 24 - y(D.prices.minimum_order_net_eur)).toFixed(1)}"/>`;
      for (let i = 0; i < n; i++) { const x = 10 + i * (bw + 10); s += `<rect x="${x.toFixed(1)}" y="${y(one).toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - 24 - y(one)).toFixed(1)}"/>`; }
      s += `<text x="${W}" y="${(y(D.prices.minimum_order_net_eur) - 6).toFixed(1)}" text-anchor="end">minimum order ${eur(D.prices.minimum_order_net_eur)}</text><text x="0" y="${H - 6}">${n} ${n === 1 ? 'party' : 'parties'} a season</text>`;
      svg.innerHTML = s;
    }
    [rg, rp, re].forEach(r => r.addEventListener('input', draw)); draw();
  });
})();
