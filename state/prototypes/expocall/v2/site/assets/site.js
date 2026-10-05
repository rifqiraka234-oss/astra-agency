(function () {
  "use strict";
  var D = JSON.parse(document.getElementById("data").textContent);
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); var m = Math.floor(s / 60), x = s % 60; return (m < 10 ? "0" : "") + m + "." + (x < 10 ? "0" : "") + x; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  var PLAY = "M7 4.5v15l13-7.5z", PAUSE = "M6 4h4v16H6zM14 4h4v16h-4z", AGAIN = "M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z";

  /* the eight bars of the ExpoCall mark, measured from their logo file (x, height, centre, colour) */
  var MARK = [[196, 23, 226.5, [9, 14, 107]], [211, 51, 227.5, [9, 33, 128]], [226, 76, 229, [8, 61, 144]], [241.5, 107, 229.5, [7, 79, 155]],
              [257.5, 107, 215.5, [5, 113, 169]], [272.5, 71, 219.5, [7, 176, 188]], [287, 44, 221, [6, 211, 201]], [300.5, 21, 223.5, [8, 234, 211]]];
  // on a night background the darkest navy bars are lifted towards white so they read
  var COL = MARK.map(function (b, i) { var k = i < 4 ? 0.42 - i * 0.08 : 0; return b[3].map(function (c) { return Math.round(c + (255 - c) * k); }); });
  function colAt(f) { f = clamp(f, 0, 1) * (COL.length - 1); var i = Math.floor(f), u = f - i, a = COL[i], b = COL[Math.min(i + 1, COL.length - 1)];
    return [0, 1, 2].map(function (k) { return Math.round(a[k] + (b[k] - a[k]) * u); }); }
  function rgba(c, a) { return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
  function peakAt(cid, t) { var p = D.t[cid].p, i = Math.floor(t * 40); return i >= 0 && i < p.length ? p[i] : 0; }
  function lineAt(cid, t) { var L = D.t[cid].l, k = -1; for (var i = 0; i < L.length; i++) { if (t >= L[i][1] - 0.05) k = i; } return k; }

  /* header, menu */
  var hdr = $("#hdr");
  var menuB = $("#menuB"), mnav = $("#mnav");
  menuB.addEventListener("click", function () { var o = mnav.classList.toggle("open"); menuB.setAttribute("aria-expanded", o ? "true" : "false"); });
  $$("#mnav a").forEach(function (a) { a.addEventListener("click", function () { mnav.classList.remove("open"); menuB.setAttribute("aria-expanded", "false"); }); });

  /* reveals, checked from the element's box so clipped or transformed items still fire */
  var rv = $$(".rv,.chart,.cols,.inbox,.map");
  function reveal() {
    var vh = window.innerHeight;
    for (var i = 0; i < rv.length; i++) { var el = rv[i]; if (el.classList.contains("in")) continue; var r = el.getBoundingClientRect();
      if (r.top < vh * 0.97 && r.bottom > 0) el.classList.add("in"); }
  }
  if (RM) rv.forEach(function (el) { el.classList.add("in"); });

  /* only one sound at a time */
  var audios = [];
  function solo(a) { audios.forEach(function (x) { if (x !== a && !x.paused) x.pause(); }); }
  function mk(el) { audios.push(el); el.addEventListener("play", function () { solo(el); }); return el; }

  /* films play only in view, never under reduced motion */
  var films = $$("video[data-auto]");
  if (!RM && "IntersectionObserver" in window) {
    var fio = new IntersectionObserver(function (es) { es.forEach(function (e) { var v = e.target; if (v.dataset.user === "off") return;
      if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause(); }); }, { threshold: 0.15 });
    films.forEach(function (v) { fio.observe(v); });
  }
  $$("[data-pause]").forEach(function (b) { b.addEventListener("click", function () { var v = b.parentNode.querySelector("video"); if (!v) return;
    if (v.paused) { v.dataset.user = ""; v.play(); b.setAttribute("aria-label", "Pause the background film"); } else { v.pause(); v.dataset.user = "off"; b.setAttribute("aria-label", "Play the background film"); } }); });

  /* hero, the mark opens into the call's waveform */
  var cv = $("#heroCv"), cx = cv.getContext("2d");
  var heroA = mk(new Audio()); heroA.preload = "none";
  heroA.src = heroA.canPlayType("audio/ogg; codecs=opus") ? "audio/late.ogg" : "audio/late.mp3";
  var unfold = 0, target = 0, heroLine = -2, N = 44;
  var heroBtn = $("#heroPlay"), heroT = $("#heroT"), heroWho = $("#heroWho"), heroSay = $("#heroSay");
  function heroLabel() { heroBtn.querySelector("span").textContent = heroA.paused ? (heroA.currentTime > 0.2 && !heroA.ended ? "Carry on listening" : "Hear a late arrival call") : "Pause the call"; }
  heroBtn.addEventListener("click", function () { if (heroA.paused) { if (heroA.ended) heroA.currentTime = 0; var p = heroA.play(); if (p && p.catch) p.catch(function () {}); } else heroA.pause(); });
  var heroIco = heroBtn.querySelector("path");
  heroA.addEventListener("play", function () { target = 1; heroLabel(); heroIco.setAttribute("d", PAUSE); });
  heroA.addEventListener("pause", function () { heroLabel(); heroIco.setAttribute("d", PLAY); });
  heroA.addEventListener("ended", function () { target = 0; heroLabel(); heroWho.innerHTML = "&nbsp;"; heroSay.textContent = "Alex's note for the morning. Hannah Price, after 00.30, porter told, sandwich tray in her room."; });
  function drawHero(now) {
    var W = cv.width, H = cv.height; cx.clearRect(0, 0, W, H);
    unfold += (target - unfold) * (RM ? 1 : 0.06);
    var t = heroA.currentTime || 0, playing = !heroA.paused, u = unfold;
    // a faint ring, the eye of the mark
    cx.strokeStyle = "rgba(77,141,255," + (0.16 - u * 0.1) + ")"; cx.lineWidth = 3; cx.beginPath(); cx.arc(W / 2, H / 2, W * 0.36, 0, Math.PI * 2); cx.stroke();
    var s = 5.4, mx = (MARK[0][0] + MARK[7][0]) / 2, my = 222;
    var lastK = -1;
    for (var j = 0; j < N; j++) {
      var f = j / (N - 1), k = Math.round(f * 7), m = MARK[k];
      // closed, the 44 bars stack onto the mark's 8, so draw one per logo bar
      if (u < 0.02) { if (k === lastK) continue; lastK = k; }
      var lx = W / 2 + (m[0] - mx) * s, lw = 9.5 * s, lh = m[1] * s, ly = H / 2 + (m[2] - my) * s;
      var breathe = RM ? 1 : 0.9 + 0.1 * Math.sin(now / 620 + k * 0.8);
      var tx = W * 0.06 + f * W * 0.88, tw = W * 0.88 / N * 0.56;
      var dt = (j - N * 0.62) * 0.07, pk = peakAt("late", t + dt);
      var th = 14 + Math.pow(pk / 99, 0.9) * H * 0.52;
      if (dt > 0) th = 14 + (th - 14) * 0.45;
      var x = lx + (tx - lx) * u, w = lw + (tw - lw) * u, h = lh * breathe + (th - lh * breathe) * u, y = ly + (H / 2 - ly) * u;
      var c = colAt(u > 0.02 ? f : k / 7), a = u > 0.02 && dt > 0 ? 0.32 + 0.68 * (1 - u) : 1;
      cx.fillStyle = rgba(c, a);
      var r = Math.min(w / 2, 14); var x0 = x - w / 2, y0 = y - h / 2;
      cx.beginPath(); if (cx.roundRect) cx.roundRect(x0, y0, w, h, r); else cx.rect(x0, y0, w, h); cx.fill();
    }
    if (u > 0.5) { cx.fillStyle = "rgba(233,238,246,.85)"; cx.fillRect(W * 0.06 + 0.62 * W * 0.88 - 1, H * 0.2, 2, H * 0.6); }
    // captions
    var li = lineAt("late", t);
    if ((playing || t > 0) && !heroA.ended && li !== heroLine) {
      heroLine = li;
      if (li >= 0) { var L = D.t.late.l[li]; heroWho.textContent = L[0] === "A" ? "Alex" : "Hannah"; heroWho.className = "who" + (L[0] === "A" ? "" : " c"); heroSay.textContent = D.n.late.text[li]; }
    }
    heroT.textContent = fmt(t);
  }

  /* waveform strip used by the call card, the Spanish call and the real recording */
  function strip(canvas, cid, t, d, accent) {
    var g = canvas.getContext("2d"), W = canvas.width, H = canvas.height, p = D.t[cid].p, bw = Math.max(4, Math.round(W / 170)), gap = Math.round(bw * 0.5), n = Math.floor(W / (bw + gap));
    g.clearRect(0, 0, W, H);
    for (var i = 0; i < n; i++) {
      var a = Math.floor(i / n * p.length), b = Math.floor((i + 1) / n * p.length), mxp = 0;
      for (var q = a; q < b; q++) if (p[q] > mxp) mxp = p[q];
      var h = Math.max(4, Math.pow(mxp / 99, 0.85) * (H - 8)), x = i * (bw + gap);
      g.fillStyle = (i + 0.5) / n <= t / d ? accent : "rgba(159,176,200,.32)";
      g.fillRect(x, (H - h) / 2, bw, h);
    }
  }

  /* the call card */
  var ccA = null, ccId = null, ccLine = -2, ccWord = -1;
  var ccWave = $("#ccWave"), ccNow = $("#ccNow"), ccPrev = $("#ccPrev"), ccWho = $("#ccWho"), ccT = $("#ccT"), ccIco = $("#ccIco"), ccNote = $("#ccNote"), ccNoteL = $("#ccNoteL");
  var fbAudio = {}; $$("audio[data-audio]").forEach(function (a) { fbAudio[a.dataset.audio] = mk(a); a.preload = "none";
    a.addEventListener("play", function () { if (a === ccA) ccIco.setAttribute("d", PAUSE); });
    a.addEventListener("pause", function () { if (a === ccA) ccIco.setAttribute("d", a.ended ? AGAIN : PLAY); });
    a.addEventListener("ended", function () { if (a === ccA) { ccIco.setAttribute("d", AGAIN); ccNote.classList.add("show"); } }); });
  function load(cid) {
    if (ccA && !ccA.paused) ccA.pause();
    ccId = cid; ccA = fbAudio[cid]; ccLine = -2; ccWord = -1; var n = D.n[cid];
    $("#ccTitle").textContent = n.title; $("#ccSub").textContent = "Alex and " + n.caller; $("#ccIntent").textContent = "Intent · " + n.intent;
    $("#ccLen").textContent = fmt(D.t[cid].d); ccT.textContent = "00.00"; ccWho.innerHTML = "&nbsp;"; ccPrev.textContent = ""; ccNow.textContent = "Press play.";
    ccNoteL.innerHTML = n.note.map(function (x) { return "<li>" + x.replace(/</g, "&lt;") + "</li>"; }).join("");
    ccNote.classList.remove("show"); ccIco.setAttribute("d", PLAY);
    $$(".pick").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.call === cid ? "true" : "false"); });
  }
  function ccPlay() { if (!ccA) return; if (ccA.paused) { if (ccA.ended) { ccA.currentTime = 0; ccNote.classList.remove("show"); ccLine = -2; } var p = ccA.play(); if (p && p.catch) p.catch(function () {}); } else ccA.pause(); }
  $$(".pick").forEach(function (b) { b.addEventListener("click", function () { if (b.dataset.call !== ccId) load(b.dataset.call); ccPlay(); }); });
  $("#ccPlay").addEventListener("click", ccPlay);
  $("#ccBack").addEventListener("click", function () { if (!ccA) return; ccA.currentTime = 0; ccLine = -2; ccNote.classList.remove("show"); if (ccA.ended || ccA.paused) ccIco.setAttribute("d", PLAY); });
  ccWave.addEventListener("click", function (e) { if (!ccA) return; var r = ccWave.getBoundingClientRect(); var f = clamp((e.clientX - r.left) / r.width, 0, 1); ccA.currentTime = f * D.t[ccId].d; ccLine = -2; ccNote.classList.remove("show"); });
  function drawCall() {
    if (!ccA) return; var t = ccA.currentTime || 0, d = D.t[ccId].d;
    strip(ccWave, ccId, t, d, "#00c2a8"); ccT.textContent = fmt(t);
    if (t < 0.05 && ccA.paused) return;
    var li = lineAt(ccId, t), L = D.t[ccId].l;
    if (li !== ccLine) {
      ccLine = li; ccWord = -1;
      if (li >= 0) {
        var words = D.n[ccId].text[li].split(" ");
        ccNow.innerHTML = words.map(function (w) { return '<span class="w">' + w.replace(/</g, "&lt;") + "</span>"; }).join(" ");
        ccWho.textContent = L[li][0] === "A" ? "Alex" : D.n[ccId].caller; ccWho.className = "who" + (L[li][0] === "A" ? "" : " c");
        ccPrev.textContent = li > 0 ? D.n[ccId].text[li - 1] : "";
      }
    }
    if (li >= 0) { var ws = L[li][3], k = -1; for (var i = 0; i < ws.length; i++) if (t >= ws[i][0] - 0.03) k = i;
      if (k !== ccWord) { ccWord = k; var sp = ccNow.querySelectorAll(".w"); for (var j = 0; j < sp.length; j++) sp[j].classList.toggle("on", j <= k); } }
  }
  load("table");

  /* the Spanish call */
  var esA = mk($("#esAudio")), esWave = $("#esWave"), esIco = $("#esIco"), esLis = $$("#esLines li");
  $("#esPlay").addEventListener("click", function () { if (esA.paused) { if (esA.ended) esA.currentTime = 0; var p = esA.play(); if (p && p.catch) p.catch(function () {}); } else esA.pause(); });
  esA.addEventListener("play", function () { esIco.setAttribute("d", PAUSE); });
  esA.addEventListener("pause", function () { esIco.setAttribute("d", esA.ended ? AGAIN : PLAY); });
  function drawEs() { var t = esA.currentTime || 0; strip(esWave, "spanish", t, D.t.spanish.d, "#00c2a8"); var li = esA.paused && t < 0.05 ? -1 : lineAt("spanish", t);
    esLis.forEach(function (el, i) { el.classList.toggle("on", i === li); }); }

  /* the real recording of Alex */
  var rA = mk($("#rAudio")); rA.controls = false; rA.style.display = "none";
  var rWave = $("#rWave"), rIco = $("#rIco"), rT = $("#rT");
  $("#rPlay").addEventListener("click", function () { if (rA.paused) { if (rA.ended) rA.currentTime = 0; var p = rA.play(); if (p && p.catch) p.catch(function () {}); } else rA.pause(); });
  rA.addEventListener("play", function () { rIco.setAttribute("d", PAUSE); });
  rA.addEventListener("pause", function () { rIco.setAttribute("d", rA.ended ? AGAIN : PLAY); });
  rWave.addEventListener("click", function (e) { var r = rWave.getBoundingClientRect(); rA.currentTime = clamp((e.clientX - r.left) / r.width, 0, 1) * D.t.real.d; });
  function drawReal() { var t = rA.currentTime || 0; strip(rWave, "real", t, D.t.real.d, "#00c2a8"); rT.textContent = fmt(t) + " / " + fmt(D.t.real.d); }

  /* the night, driven by scroll */
  var night = $("#night"), nClock = $("#nClock"), nDay = $("#nDay"), book = $$("#book li"), wins = $$("#wins rect"), ring = $("#ring"), moon = $("#moon");
  var sk1 = $("#sk1"), sk2 = $("#sk2"), lampG = $("#lampGlow");
  function hhmm(m) { var a = (18 * 60 + Math.round(m)) % 1440, h = Math.floor(a / 60), x = a % 60; return (h < 10 ? "0" : "") + h + "." + (x < 10 ? "0" : "") + x; }
  function mix(a, b, u) { return [0, 1, 2].map(function (k) { return Math.round(a[k] + (b[k] - a[k]) * u); }); }
  function hex(c) { return "rgb(" + c.join(",") + ")"; }
  var SKY = [[0, [42, 62, 120], [196, 109, 90]], [110, [16, 30, 66], [32, 44, 84]], [660, [12, 24, 56], [24, 36, 74]], [780, [70, 84, 150], [241, 185, 143]]];
  function skyAt(m) { for (var i = 0; i < SKY.length - 1; i++) if (m <= SKY[i + 1][0]) { var u = (m - SKY[i][0]) / (SKY[i + 1][0] - SKY[i][0]); return [mix(SKY[i][1], SKY[i + 1][1], u), mix(SKY[i][2], SKY[i + 1][2], u)]; } return [SKY[3][1], SKY[3][2]]; }
  var nightM = 0;
  function drawNight(now) {
    var r = night.getBoundingClientRect(), span = r.height - window.innerHeight;
    var p = clamp(-r.top / span, 0, 1), m = clamp(p / 0.9, 0, 1) * 780; nightM = m;
    nClock.textContent = hhmm(m);
    nDay.textContent = m < 360 ? "Friday evening" : m < 690 ? "Saturday, small hours" : "Saturday morning";
    var cur = -1; book.forEach(function (li, i) { if (m >= +li.dataset.m) cur = i; });
    book.forEach(function (li, i) { li.classList.toggle("now", i === cur); li.classList.toggle("done", i < cur); });
    wins.forEach(function (w) { var on = (m >= +w.dataset.on && m < +w.dataset.off) || m >= +w.dataset.am; w.setAttribute("fill", on ? "#ffcf8a" : "#16264b"); w.setAttribute("opacity", on ? "0.9" : "1"); });
    var s = skyAt(m); sk1.setAttribute("stop-color", hex(s[0])); sk2.setAttribute("stop-color", hex(s[1]));
    var mp = clamp((m - 60) / 680, 0, 1); moon.setAttribute("cx", 60 + mp * 280); moon.setAttribute("cy", 90 - Math.sin(mp * Math.PI) * 44); moon.setAttribute("opacity", m > 740 ? 0.2 : 0.85);
    var live = false; if (cur >= 0 && cur < book.length - 1) { var bm = +book[cur].dataset.m; live = m - bm < 24; }
    if (live && !RM) { var ph = (now / 900) % 1; ring.setAttribute("r", 24 + ph * 40); ring.setAttribute("opacity", (1 - ph) * 0.9); } else { ring.setAttribute("opacity", live ? 0.9 : 0); ring.setAttribute("r", 30); }
    lampG.setAttribute("opacity", live ? 1 : 0.6);
    return r.top < window.innerHeight && r.bottom > 0;
  }

  /* the statement lights word by word as it scrolls into place */
  var stmt = $("#stmt");
  (function split(el) { Array.prototype.slice.call(el.childNodes).forEach(function (n) {
    if (n.nodeType === 3) { var frag = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(function (w) { if (!w) return; if (/^\s+$/.test(w)) frag.appendChild(document.createTextNode(w)); else { var s = document.createElement("span"); s.className = "w"; s.textContent = w; frag.appendChild(s); } }); n.parentNode.replaceChild(frag, n); }
    else if (n.nodeType === 1) split(n); }); })(stmt);
  var sw = stmt.querySelectorAll(".w");
  function drawStmt() { var r = stmt.getBoundingClientRect(), vh = window.innerHeight; var p = RM ? 1 : clamp((vh * 0.95 - r.top) / (vh * 0.55), 0, 1); var k = Math.round(p * sw.length);
    for (var i = 0; i < sw.length; i++) sw[i].classList.toggle("lit", i < k); }

  /* the clock pill, shows the hour of the chapter you're in, then hides */
  var clock = $("#clock"), clockT = $("#clockT"), clockL = $("#clockL"), secs = $$("section[data-clock]"), idle = 0;
  function drawClock() {
    var mid = window.innerHeight * 0.45, s = null; secs.forEach(function (x) { var r = x.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) s = x; });
    if (!s || s.id === "top") { clock.classList.remove("on"); return; }
    clockT.textContent = s.id === "night" ? hhmm(nightM) : s.dataset.clock; clockL.textContent = s.dataset.label;
    clock.classList.toggle("on", window.innerWidth <= 1080 || performance.now() - idle < 1200);
  }

  /* calculator, plain arithmetic on the visitor's own figures */
  var cN = $("#cN"), cB = $("#cB"), cV = $("#cV"), cC = $("#cC");
  function gbp(v) { return "£" + Math.round(v).toLocaleString("en-GB"); }
  function calc() {
    cB.max = cN.value; if (+cB.value > +cN.value) cB.value = cN.value;
    $("#oN").textContent = cN.value; $("#oB").textContent = cB.value; $("#oV").textContent = gbp(+cV.value); $("#oC").textContent = cC.value + "%";
    var e = +cB.value * 30, v = e * +cV.value, c = v * +cC.value / 100;
    $("#rE").textContent = e.toLocaleString("en-GB"); $("#rV").textContent = gbp(v); $("#rC").textContent = gbp(c);
  }
  [cN, cB, cV, cC].forEach(function (i) { i.addEventListener("input", calc); }); calc();

  /* one loop for everything that moves */
  var ticking = false;
  window.addEventListener("scroll", function () { idle = performance.now(); hdr.classList.toggle("solid", window.scrollY > 40); if (!ticking) { ticking = true; requestAnimationFrame(function () { reveal(); ticking = false; }); } }, { passive: true });
  window.addEventListener("resize", reveal);
  function frame(now) {
    var hr = cv.getBoundingClientRect(); if (hr.bottom > 0 && hr.top < window.innerHeight) drawHero(now);
    reveal(); drawNight(now); drawStmt(); drawCall(); drawEs(); drawReal(); drawClock();
    requestAnimationFrame(frame);
  }
  reveal(); hdr.classList.toggle("solid", window.scrollY > 40);
  requestAnimationFrame(frame);
})();
