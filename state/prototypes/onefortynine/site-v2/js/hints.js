(function () {
  'use strict';
  var P = window.HEIST || [], list = document.querySelector('[data-pz-list]'), box = document.querySelector('[data-pz]');
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  P.forEach(function (p, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'pz-b'; b.innerHTML = '<span>' + p.n + '</span>' + esc(p.name);
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () { show(i); });
    list.appendChild(b);
  });
  function show(i) {
    var p = P[i], step = 0;
    Array.prototype.forEach.call(list.children, function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
    var steps = p.hints.map(function (h, k) { return { label: 'Hint ' + (k + 1), body: '<p>' + esc(h) + '</p>' }; });
    steps.push({ label: 'The walkthrough', body: p.walk.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') });
    box.innerHTML = '<h2>Puzzle ' + p.n + ', ' + esc(p.name) + '</h2><div class="pz-steps" data-steps></div><div class="pz-act" data-act></div>';
    var stepsEl = box.querySelector('[data-steps]'), act = box.querySelector('[data-act]');
    function next() {
      if (step < steps.length) {
        var s = steps[step++], d = document.createElement('div');
        d.className = 'pz-step'; d.innerHTML = '<h3>' + s.label + '</h3>' + s.body; stepsEl.appendChild(d);
        draw();
      }
    }
    function draw() {
      act.innerHTML = '';
      if (step < steps.length) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-solid btn-lg';
        b.textContent = step === 0 ? 'Show hint 1' : (step < p.hints.length ? 'Still stuck, show hint ' + (step + 1) : 'Show the walkthrough');
        b.addEventListener('click', next); act.appendChild(b);
      } else {
        var a = document.createElement('button'); a.type = 'button'; a.className = 'btn btn-line btn-lg'; a.textContent = 'Show the answer';
        a.addEventListener('click', function () {
          act.innerHTML = '<p class="pz-sure">Sure? This gives the code away.</p>';
          var y = document.createElement('button'); y.type = 'button'; y.className = 'btn btn-solid btn-lg'; y.textContent = 'Yes, show the code';
          y.addEventListener('click', function () {
            act.innerHTML = '<div class="pz-code" aria-label="The code is ' + p.code.split('').join(' ') + '">' + p.code.split('').map(function (c) { return '<span>' + esc(c) + '</span>'; }).join('') + '</div>';
          });
          act.appendChild(y);
        });
        act.appendChild(a);
      }
    }
    draw();
    box.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
})();
