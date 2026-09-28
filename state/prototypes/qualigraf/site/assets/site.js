(function(){
  var d=document,w=window,root=d.documentElement;
  var RM=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header */
  var hdr=d.querySelector('.hdr');
  function onScroll(){if(hdr){hdr.classList.toggle('sc',w.scrollY>8);}}
  var mb=d.querySelector('.menu-btn'),mn=d.getElementById('mnav');
  if(mb&&mn){
    mb.addEventListener('click',function(){var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':'';});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&mn.classList.contains('open')){mn.classList.remove('open');mb.setAttribute('aria-expanded','false');d.body.style.overflow='';mb.focus();}});
  }

  /* reveal, driven by position checks (IntersectionObserver misses clipped elements) */
  var rv=[].slice.call(d.querySelectorAll('.rv,.track,[data-count],video[data-auto]'));
  function inView(el,pad){var r=el.getBoundingClientRect();var h=w.innerHeight||root.clientHeight;return r.top<h-(pad||60)&&r.bottom>0;}
  function check(){
    for(var i=0;i<rv.length;i++){var el=rv[i];
      if(el.tagName==='VIDEO'){vidCheck(el);continue;}
      if(el.__done)continue;
      if(inView(el)){el.__done=true;
        if(el.classList.contains('track'))el.classList.add('go');
        if(el.hasAttribute('data-count'))countUp(el);
        el.classList.add('in');}
    }
  }
  var tick=false;
  function req(){if(!tick){tick=true;w.requestAnimationFrame(function(){tick=false;onScroll();check();});}}
  w.addEventListener('scroll',req,{passive:true});w.addEventListener('resize',req);
  var hero=d.querySelector('.hero');
  w.addEventListener('load',function(){req();});
  setTimeout(function(){if(hero)hero.classList.add('in');req();},60);

  /* stations cycle with the travelling file */
  var st=d.querySelector('.track .stations');
  if(st&&!RM){var lis=st.querySelectorAll('li'),t0=null;
    var stepSt=function(ts){var tr=st.closest('.track');if(tr&&tr.classList.contains('go')){if(t0===null)t0=ts;var k=Math.floor(((ts-t0)/1500)%8);for(var i=0;i<lis.length;i++)lis[i].classList.toggle('on',i<=k);}w.requestAnimationFrame(stepSt);};
    w.requestAnimationFrame(stepSt);}
  else if(st){[].forEach.call(st.querySelectorAll('li'),function(l){l.classList.add('on');});}

  /* count up */
  function countUp(el){var to=parseFloat(el.getAttribute('data-count')),suf=el.getAttribute('data-suffix')||'',fmt=function(v){return Math.round(v).toLocaleString('en-GB')+suf;};
    if(RM){el.textContent=fmt(to);return;}var s=null;
    function f(ts){if(!s)s=ts;var p=Math.min(1,(ts-s)/1400);p=1-Math.pow(1-p,3);el.textContent=fmt(to*p);if(p<1)w.requestAnimationFrame(f);}
    w.requestAnimationFrame(f);}

  /* tabs */
  [].forEach.call(d.querySelectorAll('[role=tablist]'),function(tl){
    var tabs=[].slice.call(tl.querySelectorAll('[role=tab]'));
    function sel(t,focus){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;var p=d.getElementById(x.getAttribute('aria-controls'));if(p){if(on){p.removeAttribute('hidden');}else{p.setAttribute('hidden','');}}});if(focus)t.focus();req();}
    tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});
      t.addEventListener('keydown',function(e){var k=e.key,n=null;if(k==='ArrowRight')n=tabs[(i+1)%tabs.length];if(k==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(k==='Home')n=tabs[0];if(k==='End')n=tabs[tabs.length-1];if(n){e.preventDefault();sel(n,true);}});});
    var cur=tabs.filter(function(t){return t.getAttribute('aria-selected')==='true';})[0]||tabs[0];sel(cur);
  });

  /* videos, play only in view, never under reduced motion */
  function vidCheck(v){if(RM||v.__paused)return;var on=inView(v,0);if(on&&v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){});}else if(!on&&!v.paused){v.pause();}}
  [].forEach.call(d.querySelectorAll('.vid'),function(box){var v=box.querySelector('video'),b=box.querySelector('.pp');if(!v||!b)return;
    var PL='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 4l10 6-10 6z"/></svg>',PA='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 4h3v12H5zM12 4h3v12h-3z"/></svg>';
    function sync(){b.innerHTML=v.paused?PL:PA;b.setAttribute('aria-label',v.paused?'Play animation':'Pause animation');}
    v.addEventListener('play',sync);v.addEventListener('pause',sync);sync();
    b.addEventListener('click',function(){if(v.paused){v.__paused=false;v.play();}else{v.__paused=true;v.pause();}});});

  /* clear days calculator, R v Swansea City Council ex p Elitestone (1993), England and Wales bank holidays from GOV.UK */
  var BH=['2026-01-01','2026-04-03','2026-04-06','2026-05-04','2026-05-25','2026-08-31','2026-12-25','2026-12-28','2027-01-01','2027-03-26','2027-03-29','2027-05-03','2027-05-31','2027-08-30','2027-12-27','2027-12-28','2028-01-03','2028-04-14','2028-04-17','2028-05-01','2028-05-29','2028-08-28','2028-12-25','2028-12-26'];
  function iso(x){return x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2);}
  function isBH(x){return BH.indexOf(iso(x))>-1;}
  function isWork(x){var g=x.getDay();return g>0&&g<6&&!isBH(x);}
  function add(x,n){var y=new Date(x.getFullYear(),x.getMonth(),x.getDate()+n);return y;}
  var DN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
  function nice(x){return DN[x.getDay()]+' '+x.getDate()+' '+MN[x.getMonth()]+' '+x.getFullYear();}
  [].forEach.call(d.querySelectorAll('[data-calc]'),function(c){
    var inp=c.querySelector('input[type=date]'),out=c.querySelector('.out');if(!inp||!out)return;
    function run(){var v=inp.value;if(!/^\d{4}-\d{2}-\d{2}$/.test(v)){out.innerHTML='<p class="small">Pick the date of the meeting.</p>';return;}
      var p=v.split('-'),m=new Date(+p[0],+p[1]-1,+p[2]);var clear=[],x=add(m,-1),guard=0;
      while(clear.length<5&&guard<60){if(isWork(x))clear.push(iso(x));x=add(x,-1);guard++;}
      var pub=x;while(!isWork(pub)&&guard<80){pub=add(pub,-1);guard++;}
      var yr=m.getFullYear(),known=(yr>=2026&&yr<=2028);
      var h='<p class="small mb0">Latest day to publish the agenda and reports</p><p class="big">'+nice(pub)+'</p>';
      h+='<p class="small">That leaves five clear working days before the meeting on '+nice(m)+'. Weekends and bank holidays don’t count, and neither do the day you publish or the day you meet.'+(known?'':' Bank holidays are loaded for 2026 to 2028, so check any other year by hand.')+'</p>';
      var start=add(pub,-((pub.getDay()+6)%7)),end=m,g='<div class="cal" aria-hidden="true"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>';
      for(var y=start;y<=end;y=add(y,1)){var k=iso(y),cls='';if(k===iso(pub))cls='pub';else if(k===iso(m))cls='meet';else if(clear.indexOf(k)>-1)cls='clear';else if(y>pub&&y<m&&!isWork(y))cls='off';g+='<i class="'+cls+'">'+y.getDate()+'</i>';}
      g+='</div><div class="key" aria-hidden="true"><span><b style="background:#2A3C5E"></b>Publish</span><span><b style="background:#D5EFF1"></b>Clear day</span><span><b style="background:#FE764A"></b>Meeting</span></div>';
      out.innerHTML=h+g;}
    inp.addEventListener('change',run);inp.addEventListener('input',run);
    if(!inp.value){var t=new Date(),n=add(t,21);while(n.getDay()!==2)n=add(n,1);inp.value=iso(n);}run();
  });

  /* countdown to a date */
  [].forEach.call(d.querySelectorAll('[data-countdown]'),function(el){var p=el.getAttribute('data-countdown').split('-'),to=new Date(+p[0],+p[1]-1,+p[2]),now=new Date();now=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    var days=Math.round((to-now)/864e5);var b=el.querySelector('b'),sp=el.querySelector('span');if(b&&days>=0){b.textContent=days.toLocaleString('en-GB');if(sp&&el.getAttribute('data-label'))sp.textContent=el.getAttribute('data-label');}var wk=el.parentNode.querySelector('[data-weeks]');if(wk&&days>=0)wk.textContent=Math.floor(days/7);});

  /* checklist progress */
  [].forEach.call(d.querySelectorAll('[data-checklist]'),function(l){var bx=[].slice.call(l.querySelectorAll('input[type=checkbox]')),bar=d.querySelector(l.getAttribute('data-checklist')),lab=d.querySelector(l.getAttribute('data-checklist')+'-t');
    function up(){var n=bx.filter(function(b){return b.checked;}).length;if(bar)bar.style.width=(100*n/bx.length)+'%';if(lab)lab.textContent=n+' of '+bx.length+' ready';}
    bx.forEach(function(b){b.addEventListener('change',up);});up();});

  /* forms, validation then a real POST (Netlify Forms on this host) */
  [].forEach.call(d.querySelectorAll('form[data-form]'),function(f){
    var wrap=f.closest('.form'),errBox=f.querySelector('.formerr');
    function vf(fl){var i=fl.querySelector('input,select,textarea');if(!i)return true;var ok=true,v=(i.value||'').trim();
      if(i.hasAttribute('required')&&!v)ok=false;
      if(ok&&i.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))ok=false;
      if(ok&&i.type==='checkbox'&&i.hasAttribute('required')&&!i.checked)ok=false;
      fl.classList.toggle('bad',!ok);i.setAttribute('aria-invalid',ok?'false':'true');return ok;}
    [].forEach.call(f.querySelectorAll('.field'),function(fl){var i=fl.querySelector('input,select,textarea');if(i)i.addEventListener('blur',function(){if(fl.classList.contains('bad'))vf(fl);});});
    f.addEventListener('submit',function(e){e.preventDefault();var bad=null;
      [].forEach.call(f.querySelectorAll('.field'),function(fl){if(!vf(fl)&&!bad)bad=fl;});
      if(bad){var i=bad.querySelector('input,select,textarea');if(i)i.focus();return;}
      var btn=f.querySelector('[type=submit]'),lbl=btn.innerHTML;btn.disabled=true;btn.textContent='Sending…';if(errBox)errBox.classList.remove('show');
      var body=new URLSearchParams(new FormData(f)).toString();
      fetch(f.getAttribute('action')||'/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body}).then(function(r){if(!r.ok)throw new Error(r.status);wrap.classList.add('sent');var h=wrap.querySelector('.ok h3');if(h){h.setAttribute('tabindex','-1');h.focus();}}).catch(function(){btn.disabled=false;btn.innerHTML=lbl;if(errBox)errBox.classList.add('show');});
    });
  });


  /* v2 motion layer */
  var win=d.querySelector('.window');
  var bands=[].slice.call(d.querySelectorAll('.photo-band>img'));
  var stm=[].slice.call(d.querySelectorAll('.statement[data-scrub]'));
  stm.forEach(function(el){var out=[];[].forEach.call(el.childNodes,function(n){if(n.nodeType===3){n.textContent.split(/(\s+)/).forEach(function(t){if(!t)return;if(/^\s+$/.test(t))out.push(d.createTextNode(t));else{var s=d.createElement('span');s.className='w';s.textContent=t;out.push(s);}});}else{var s=d.createElement('span');s.className='w';s.appendChild(n.cloneNode(true));out.push(s);}});el.innerHTML='';out.forEach(function(o){el.appendChild(o);});});
  var sc=d.querySelector('.scrolly'),steps=sc?[].slice.call(sc.querySelectorAll('.step')):[],figs=sc?[].slice.call(sc.querySelectorAll('.stage2 figure')):[],rails=sc?[].slice.call(sc.querySelectorAll('.rail i')):[],rl=sc?sc.querySelector('.rail-l b'):null;
  function motion(){
    var h=w.innerHeight;
    if(win&&!RM&&w.innerWidth>700){var r=win.getBoundingClientRect();var p=Math.min(1,Math.max(0,(h-r.top)/(h*0.9)));win.style.setProperty('--tilt',(16-16*p).toFixed(2)+'deg');win.style.setProperty('--sc',(0.94+0.06*p).toFixed(3));}
    if(!RM)bands.forEach(function(im){var r=im.parentNode.getBoundingClientRect();if(r.bottom<0||r.top>h)return;var p=(r.top+r.height/2-h/2)/h;im.style.setProperty('--py',(p*-60).toFixed(1)+'px');});
    stm.forEach(function(el){var r=el.getBoundingClientRect();var ws=el.querySelectorAll('.w');var p=Math.min(1,Math.max(0,(h*0.85-r.top)/(r.height+h*0.35)));var k=Math.round(p*ws.length);for(var i=0;i<ws.length;i++)ws[i].classList.toggle('on',i<k);});
    if(steps.length){var best=0,bd=1e9;steps.forEach(function(s,i){var r=s.getBoundingClientRect();var dd=Math.abs(r.top+r.height/2-h/2);if(dd<bd){bd=dd;best=i;}});
      steps.forEach(function(s,i){s.classList.toggle('on',i===best);});figs.forEach(function(f,i){f.classList.toggle('on',i===best);});rails.forEach(function(x,i){x.classList.toggle('on',i<=best);});if(rl)rl.textContent=(best+1)+' of '+steps.length;}
  }
  var mt=false;w.addEventListener('scroll',function(){if(!mt){mt=true;w.requestAnimationFrame(function(){mt=false;motion();});}},{passive:true});w.addEventListener('resize',motion);motion();
  if(w.matchMedia&&w.matchMedia('(hover:hover) and (pointer:fine)').matches){[].forEach.call(d.querySelectorAll('.tile'),function(t){t.addEventListener('mousemove',function(e){var r=t.getBoundingClientRect();t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px');});});}
  onScroll();check();
})();
