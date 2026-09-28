/* v3, the life of one decision. Homepage only. Every animation runs only while it's on screen, and
   under reduced motion each one draws a single still frame. */
(function(){
  var d=document,w=window;
  var RM=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR=Math.min(2,w.devicePixelRatio||1);
  var C={night:'#0E1526',coral:'#FE764A',teal:'#37BAC5',mustard:'#F4B63F',plum:'#B592B6',cream:'#FEFAEB',teal2:'#8FE3EA'};
  function vis(el,pad){var r=el.getBoundingClientRect(),h=w.innerHeight;pad=pad||0;return r.bottom>-pad&&r.top<h+pad;}
  function clamp(x,a,b){return x<a?a:x>b?b:x;}
  function sm(x,a,b){x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x);}
  function fit(cv){var r=cv.getBoundingClientRect();var W=Math.max(1,Math.round(r.width)),H=Math.max(1,Math.round(r.height));if(cv.width!==W*DPR||cv.height!==H*DPR){cv.width=W*DPR;cv.height=H*DPR;}var c=cv.getContext('2d');c.setTransform(DPR,0,0,DPR,0,0);return {c:c,W:W,H:H};}
  var loops=[];function loop(fn){loops.push(fn);}
  function frame(t){for(var i=0;i<loops.length;i++)loops[i](t);w.requestAnimationFrame(frame);}
  var onScroll=[];function sc(fn){onScroll.push(fn);}
  var ticking=false;function runScroll(){ticking=false;for(var i=0;i<onScroll.length;i++)onScroll[i]();}
  w.addEventListener('scroll',function(){if(!ticking){ticking=true;w.requestAnimationFrame(runScroll);}},{passive:true});
  w.addEventListener('resize',runScroll);
  function once(el,fn,pad){var done=false;function ck(){if(!done&&el.getBoundingClientRect().top<w.innerHeight-(pad||80)&&el.getBoundingClientRect().bottom>0){done=true;fn();}}sc(ck);setTimeout(ck,80);}

  /* hero, a field of papers that turns into the curl, then into one track */
  var hero=d.querySelector('.xhero'),hc=hero&&hero.querySelector('.xh-field');
  if(hero){setTimeout(function(){hero.classList.add('in');},60);}
  if(hc){
    var copy=hero.querySelector('.xh-copy'),end=hero.querySelector('.xh-end'),cue=hero.querySelector('.xh-cue');
    var N=w.innerWidth<700?520:1150,P=[],pal=[C.cream,C.cream,C.cream,C.coral,C.teal,C.mustard,C.plum];
    var curlPts=[];
    (function(){var s=d.createElement('canvas');s.width=s.height=300;var x=s.getContext('2d');try{var p=new Path2D(hc.getAttribute('data-curl'));x.scale(2,2);x.fill(p,'evenodd');var im=x.getImageData(0,0,300,300).data;for(var y=0;y<300;y+=2)for(var q=0;q<300;q+=2){if(im[(y*300+q)*4+3]>128)curlPts.push([q/300,y/300]);}}catch(e){}
      if(!curlPts.length){for(var i=0;i<400;i++){var a=Math.random()*6.283;curlPts.push([.5+Math.cos(a)*.4,.5+Math.sin(a)*.4]);}}})();
    for(var i=0;i<N;i++){var cp=curlPts[Math.floor(Math.random()*curlPts.length)];
      P.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00018,vy:(Math.random()-.5)*.00012,r:Math.random()*6.283,vr:(Math.random()-.5)*.01,
        w:3+Math.random()*4,h:4+Math.random()*5,col:pal[i%pal.length],cx:cp[0],cy:cp[1],jx:(Math.random()-.5),jy:(Math.random()-.5),lt:Math.random(),ph:Math.random()*6.283});}
    var hp=0;
    function heroP(){var r=hero.getBoundingClientRect(),span=r.height-w.innerHeight;hp=span>0?clamp(-r.top/span,0,1):0;
      var co=1-sm(hp,.06,.3);if(copy)copy.style.setProperty('--co',co.toFixed(3));if(copy)copy.style.setProperty('--cy',(hp*160).toFixed(1));if(cue)cue.style.setProperty('--co',co.toFixed(3));
      if(end){var eo=sm(hp,.7,.86);end.style.setProperty('--eo',eo.toFixed(3));end.style.setProperty('--ey',((1-eo)*30).toFixed(1));}}
    sc(heroP);heroP();
    function drawHero(t){var f=fit(hc),c=f.c,W=f.W,H=f.H;c.clearRect(0,0,W,H);
      var e1=RM?0:sm(hp,.14,.44),e2=RM?0:sm(hp,.56,.84);
      var S=Math.min(W,H)*(W<700?.62:.5),ox=(W-S)/2,oy=(H-S)/2-H*.03;
      var ly=H*.5,lx0=W*.08,lx1=W*.92;
      for(var i=0;i<P.length;i++){var p=P[i];
        if(!RM){p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;if(p.x<-.05)p.x=1.05;if(p.x>1.05)p.x=-.05;if(p.y<-.05)p.y=1.05;if(p.y>1.05)p.y=-.05;}
        var ax=p.x*W,ay=p.y*H;
        var bx=ox+p.cx*S+Math.sin(t*.001+p.ph)*1.2,by=oy+p.cy*S+Math.cos(t*.0012+p.ph)*1.2;
        var cx=lx0+p.lt*(lx1-lx0),cy=ly+p.jy*10*(1-Math.abs(p.jx))+Math.sin(t*.002+p.lt*20)*1.5;
        var x=ax+(bx-ax)*e1,y=ay+(by-ay)*e1;x=x+(cx-x)*e2;y=y+(cy-y)*e2;
        var rot=p.r*(1-e1)*(1-e2),sz=1-e1*.45+e2*.1;
        c.globalAlpha=(.35+.5*e1+.1*e2)*(p.col===C.cream?.8:1);
        c.fillStyle=p.col;c.save();c.translate(x,y);c.rotate(rot);c.fillRect(-p.w*sz/2,-p.h*sz/2,p.w*sz,p.h*sz);c.restore();}
      c.globalAlpha=1;
      if(e2>.05){var lab=['Forward plan','Report','Sign off','Agenda pack','Meeting','Decision','Publication','Archive'];
        c.font='700 '+(W<700?10:13)+'px "Source Sans 3", sans-serif';c.textAlign='center';
        for(var k=0;k<8;k++){var sx=lx0+(k/7)*(lx1-lx0),g=c.createRadialGradient(sx,ly,0,sx,ly,26);g.addColorStop(0,'rgba(244,182,63,'+(.55*e2)+')');g.addColorStop(1,'rgba(244,182,63,0)');c.fillStyle=g;c.beginPath();c.arc(sx,ly,26,0,6.283);c.fill();
          c.fillStyle='rgba(255,255,255,'+e2+')';c.beginPath();c.arc(sx,ly,5,0,6.283);c.fill();
          if(W>=560||k%7===0){c.fillStyle='rgba(170,180,200,'+e2+')';c.fillText(lab[k],sx,ly+(k%2?-22:34));}}}
    }
    if(RM){drawHero(0);w.addEventListener('resize',function(){drawHero(0);});}
    else loop(function(t){if(vis(hero))drawHero(t);});
  }

  /* chapter bar */
  var chs=[].slice.call(d.querySelectorAll('.ch')),nav=d.querySelector('.chnav'),wrapCh=d.querySelector('.chapters');
  if(nav&&chs.length){var idleT;w.addEventListener('scroll',function(){nav.classList.remove('idle');clearTimeout(idleT);idleT=setTimeout(function(){nav.classList.add('idle');},1600);},{passive:true});
    var links=[].slice.call(nav.querySelectorAll('ol a')),now=nav.querySelector('.chn-now');
    sc(function(){var h=w.innerHeight,r=wrapCh.getBoundingClientRect();var on=r.top<h*.55&&r.bottom>h*.9;nav.classList.toggle('on',on);
      var cur=0;for(var i=0;i<chs.length;i++){if(chs[i].getBoundingClientRect().top<h*.5)cur=i;}
      links.forEach(function(a,i){if(i===cur)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});
      if(now){now.querySelector('b').textContent=cur+1;now.querySelector('span').textContent=chs[cur].getAttribute('data-ch');}
      nav.style.setProperty('--cp',clamp((h*.5-r.top)/r.height,0,1).toFixed(3));});}

  /* wrapped, the council's paper year from its own numbers */
  var wf=d.querySelector('[data-wrapped]');
  if(wf){var out=function(k){return d.querySelector('[data-w="'+k+'"]');};var svg=d.querySelector('.wr-stack');
    function num(n){var v=parseFloat(wf.elements[n].value);return isFinite(v)&&v>0?v:0;}
    function fmt(v,dp){return v.toLocaleString('en-GB',{maximumFractionDigits:dp||0,minimumFractionDigits:0});}
    function calc(){var m=num('m'),p=num('p'),g=num('g');var pages=Math.round(m*p*g),metres=pages*0.0001,reams=pages/500;
      out('pages').textContent=fmt(pages);var rl=out('reamline'),rn=Math.round(reams);rl.innerHTML=reams<1?'Less than one ream of paper.':'That\'s <b>'+fmt(rn)+'</b> '+(rn===1?'ream':'reams')+' of paper.';
      out('metres').textContent=metres<0.01?'under 0.01':metres<10?fmt(metres,2):fmt(metres,1);out('deadlines').textContent=fmt(Math.round(m));
      if(svg){var top=20,base=226,room=base-top,scale=room/Math.max(metres,1.8),ph=Math.max(1,metres*scale),pe=Math.max(4,1.8*scale);
        var pile=svg.querySelector('.pile');pile.setAttribute('y',(base-ph).toFixed(1));pile.setAttribute('height',ph.toFixed(1));
        var ps=svg.querySelector('.person');var hd=ps.querySelector('circle'),bd=ps.querySelector('rect');var hr=Math.max(1.5,pe*.11);hd.setAttribute('r',hr.toFixed(1));hd.setAttribute('cy',(base-pe+hr).toFixed(1));bd.setAttribute('y',(base-pe+hr*2.2).toFixed(1));bd.setAttribute('height',Math.max(1,pe-hr*2.2).toFixed(1));bd.setAttribute('width',Math.max(2,pe*.18).toFixed(1));bd.setAttribute('x',(176-Math.max(2,pe*.18)/2).toFixed(1));
        var lab=svg.querySelector('.lab');lab.setAttribute('y',(base-ph-6).toFixed(1));lab.textContent=metres<0.01?'':(metres<10?fmt(metres,2):fmt(metres,1))+' m';
        var ru=svg.querySelector('.ruler');ru.innerHTML='';var span=Math.max(metres,1.8),stp=[.5,1,2,5,10,20,50,100,200,500,1000,2000,5000,10000].filter(function(s){return span/s<=8;})[0]||10000;
        for(var v=0;v<=span+1e-9;v+=stp){var y=base-v*scale;var ln=d.createElementNS('http://www.w3.org/2000/svg','line');ln.setAttribute('x1','60');ln.setAttribute('x2','84');ln.setAttribute('y1',y.toFixed(1));ln.setAttribute('y2',y.toFixed(1));ru.appendChild(ln);
          var tx=d.createElementNS('http://www.w3.org/2000/svg','text');tx.setAttribute('x','54');tx.setAttribute('y',(y+4).toFixed(1));tx.setAttribute('text-anchor','end');tx.setAttribute('font-size','11');tx.setAttribute('font-family','Source Sans 3, sans-serif');tx.setAttribute('fill','#15203A');tx.setAttribute('fill-opacity','.6');tx.setAttribute('stroke','none');tx.textContent=fmt(v,1)+' m';ru.appendChild(tx);}
        var bl=d.createElementNS('http://www.w3.org/2000/svg','line');bl.setAttribute('x1','60');bl.setAttribute('x2','210');bl.setAttribute('y1',base);bl.setAttribute('y2',base);ru.appendChild(bl);}}
    wf.addEventListener('input',calc);calc();}

  /* 1, the 28 day dial */
  var dial=d.querySelector('[data-dial]');
  if(dial){var g=dial.querySelector('.ticks28'),n=dial.querySelector('[data-dialn]'),T=[];
    for(var k=0;k<28;k++){var r=d.createElementNS('http://www.w3.org/2000/svg','rect');r.setAttribute('x','96');r.setAttribute('y','8');r.setAttribute('width','8');r.setAttribute('height','22');r.setAttribute('rx','4');r.setAttribute('transform','rotate('+(k*360/28)+' 100 100)');g.appendChild(r);T.push(r);}
    once(dial,function(){if(RM){T.forEach(function(r){r.classList.add('on');});return;}var i=0;n.textContent='0';var iv=setInterval(function(){T[i].classList.add('on');i++;n.textContent=i;if(i>=28)clearInterval(iv);},70);});}

  /* 2, the sign off route */
  var rt=d.querySelector('[data-route]');
  if(rt){var tA=rt.querySelector('#rt-a'),tB=rt.querySelector('#rt-b'),lis=[].slice.call(rt.querySelectorAll('.rt-line li')),file=rt.querySelector('.rt-file'),user=false,timers=[];
    function clearT(){timers.forEach(clearTimeout);timers=[];}
    function play(){clearT();lis.forEach(function(l){l.classList.remove('done');});if(file)file.style.setProperty('--fx','0px');
      lis.forEach(function(l,i){timers.push(setTimeout(function(){l.classList.add('done');if(file&&w.innerWidth>760){var lw=rt.querySelector('.rt-line').getBoundingClientRect().width;file.style.setProperty('--fx',Math.round(i*lw/4)+'px');}},RM?0:500+i*750));});}
    tB.addEventListener('click',function(){play();});
    [tA,tB].forEach(function(b){b.addEventListener('pointerdown',function(){user=true;clearT();});b.addEventListener('keydown',function(){user=true;});});
    once(rt,function(){if(RM){play();return;}tA.click();timers.push(setTimeout(function(){if(!user)tB.click();},3400));},160);}

  /* 4, meeting night */
  var night=d.querySelector('.night');
  if(night){once(night,function(){night.classList.add('in');},0);
    var hud=night.querySelector('[data-hud]'),tc=hud.querySelector('[data-tc]'),spk=hud.querySelector('[data-spk]'),spi=hud.querySelector('[data-spi]'),q=hud.querySelector('[data-q]'),vt=hud.querySelector('[data-votes]');
    var S=[['Chair','Item 4.1'],['Portfolio holder','Item 4.1, introducing the report'],['Opposition group leader','Item 4.1, question'],['Monitoring Officer','Item 4.1, advice to the meeting'],['Chair','Item 4.1, moving to the vote']],si=0,secs=19*3600+4*60+12;
    function two(x){return (x<10?'0':'')+x;}
    once(hud,function(){
      function votes(){vt.classList.remove('go','done');[].forEach.call(vt.querySelectorAll('[data-v]'),function(b){b.textContent='0';});
        setTimeout(function(){vt.classList.add('go');[].forEach.call(vt.querySelectorAll('[data-v]'),function(b){var to=+b.getAttribute('data-v'),s0=null;(function f(ts){if(!s0)s0=ts;var p=Math.min(1,(ts-s0)/1400);b.textContent=Math.round(to*p);if(p<1)w.requestAnimationFrame(f);})(performance.now());});},300);
        setTimeout(function(){vt.classList.add('done');},1900);}
      if(RM){vt.classList.add('go','done');return;}
      votes();
      setInterval(function(){if(!vis(hud))return;secs++;tc.textContent=two(Math.floor(secs/3600))+'.'+two(Math.floor(secs/60)%60)+'.'+two(secs%60);
        if(secs%4===0){si=(si+1)%S.length;spk.textContent=S[si][0];spi.textContent=S[si][1];var f=q.firstElementChild;q.appendChild(f);}
        if(secs%20===0)votes();},1000);},40);}

  /* 5, the pipeline */
  var pipe=d.querySelector('[data-pipe]');
  if(pipe){var st=[].slice.call(pipe.querySelectorAll('.pp-s')),wv=pipe.querySelector('.pp-wave');
    once(pipe,function(){st.forEach(function(s,i){setTimeout(function(){s.classList.add('on');},RM?0:i*900);});},120);
    if(wv){var bars=[];for(var b=0;b<56;b++)bars.push(Math.random());
      function drawWave(t){var f=fit(wv),c=f.c,W=f.W,H=f.H;c.clearRect(0,0,W,H);var n=bars.length,bw=W/n;
        for(var i=0;i<n;i++){var a=RM?bars[i]:(.35+.65*Math.abs(Math.sin(t*.003+i*.55)*Math.cos(t*.0013+i*.21)));var bh=Math.max(3,a*H*.78);
          var g=c.createLinearGradient(0,H/2-bh/2,0,H/2+bh/2);g.addColorStop(0,C.coral);g.addColorStop(1,C.mustard);c.fillStyle=g;c.fillRect(i*bw+bw*.2,H/2-bh/2,bw*.6,bh);}
        c.fillStyle='#FF8B8B';c.font='700 11px "Source Sans 3", sans-serif';c.fillText('REC',10,18);}
      if(RM){drawWave(0);w.addEventListener('resize',function(){drawWave(0);});}else loop(function(t){if(vis(wv))drawWave(t);});}}

  /* 6, the archive wall */
  var arc=d.querySelector('[data-archive]');
  if(arc){var cv=arc.querySelector('.arc-wall'),inp=arc.querySelector('input'),chips=[].slice.call(arc.querySelectorAll('.arc-chips button')),res=arc.querySelector('.arc-res');
    var COLS=72,ROWS=26,TOT=COLS*ROWS,base=[],lit=[],litT=0;
    for(var i=0;i<TOT;i++)base.push(Math.random());
    var SETS={'parking main street':[['Council proposal, parking Main Street','Report'],['Motion Green Parking','Motion'],['Traffic density report for main street','Background']],
      'city centre plan':[['Progress report on the city centre development plan','Report'],['Decision, city centre development plan','Decision'],['Webcast, Full Council, item 4.1','Webcast']],
      'traffic':[['Research report on traffic','Report'],['Traffic density report for main street','Background'],['Motion Green Parking','Motion']]};
    function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
    function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
    function run(qs){qs=(qs||'').trim().toLowerCase();var set=SETS[qs],n=0;lit=[];
      if(qs){var h=hash(qs);n=set?set.length:3+(h%5);for(var i=0;i<n;i++){h=Math.imul(h^(h>>>13),2654435761)>>>0;var ix=h%TOT;if(ix%COLS%12===11)ix--;lit.push(ix);}}
      litT=performance.now();
      chips.forEach(function(c){c.setAttribute('aria-pressed',c.textContent===qs?'true':'false');});
      var html='<p class="arc-n"><b>'+n+'</b> '+(n===1?'match':'matches')+' among '+TOT.toLocaleString('en-GB')+' sample documents</p>';
      if(set)html+='<ul>'+set.map(function(r){return '<li>'+esc(r[0])+'<span>'+esc(r[1])+'</span></li>';}).join('')+'</ul>';
      else if(qs)html+='<p class="small">This is a sample archive. In yours, the same search finds reports, decisions, motions and webcasts by topic.</p>';
      else html+='<p class="small">Type a search, or pick one of the samples.</p>';
      res.innerHTML=html;if(RM)drawArc(0);}
    function drawArc(t){var f=fit(cv),c=f.c,W=f.W,H=f.H;c.clearRect(0,0,W,H);var cw=W/COLS,rh=H/ROWS,g=Math.max(.6,cw*.18);
      var age=(t-litT)/1000,sweep=RM?2:age*1.6;
      var HUE=['143,163,200','143,163,200','143,227,234','254,167,132','181,146,182'];
      for(var i=0;i<TOT;i++){var col=i%COLS,x=col*cw+Math.floor(col/12)*0,y=Math.floor(i/COLS)*rh;var b=base[i];if(col%12===11)continue;c.fillStyle='rgba('+HUE[Math.floor(b*5)]+','+(.07+b*.16)+')';c.fillRect(x+g/2,y+g/2,cw-g,rh-g);}
      if(!RM&&sweep<1.2){var sx=sweep*W;var gr=c.createLinearGradient(sx-80,0,sx,0);gr.addColorStop(0,'rgba(55,186,197,0)');gr.addColorStop(1,'rgba(55,186,197,.35)');c.fillStyle=gr;c.fillRect(sx-80,0,80,H);}
      for(var k=0;k<lit.length;k++){var j=lit[k],x2=(j%COLS)*cw,y2=Math.floor(j/COLS)*rh;if(!RM&&x2>sweep*W)continue;
        var pu=RM?1:(.6+.4*Math.sin(t*.005+k)),rr=Math.max(cw,rh)*3.2;var gg=c.createRadialGradient(x2+cw/2,y2+rh/2,0,x2+cw/2,y2+rh/2,rr);gg.addColorStop(0,'rgba(244,182,63,'+(.55*pu)+')');gg.addColorStop(1,'rgba(244,182,63,0)');c.fillStyle=gg;c.beginPath();c.arc(x2+cw/2,y2+rh/2,rr,0,6.283);c.fill();
        c.fillStyle=C.mustard;c.fillRect(x2-cw*.4,y2-rh*.4,cw*1.8,rh*1.8);}}
    var deb;inp.addEventListener('input',function(){clearTimeout(deb);deb=setTimeout(function(){run(inp.value);},220);});
    chips.forEach(function(ch){ch.addEventListener('click',function(){inp.value=ch.textContent;run(ch.textContent);});});
    run(inp.value);
    if(RM){w.addEventListener('resize',function(){drawArc(0);});}else{loop(function(t){if(vis(cv))drawArc(t);});once(arc,function(){run(inp.value);},100);}}

  /* 7, Surrey */
  var sy=d.querySelector('[data-surrey]');
  if(sy){once(sy,function(){if(RM){sy.classList.add('s1','s2');return;}setTimeout(function(){sy.classList.add('s1');},500);setTimeout(function(){sy.classList.add('s2');},2000);},120);}

  /* 8, the globe, dots from Natural Earth land (world atlas 110m) */
  var gc=d.querySelector('[data-globe]');
  if(gc){var dots=null,loading=false,rad=Math.PI/180;
    var HOME=[4.67,51.81],PL=[{n:'Dordrecht',p:HOME,c:C.coral,dx:70,dy:-26},{n:'France',p:[2.35,46.6],c:C.teal,dx:60,dy:34},{n:'Canada',p:[-75.7,45.42],c:C.teal,dx:0,dy:40},{n:'United Kingdom',p:[-2.18,53.0],c:C.teal,dx:-30,dy:-48}];
    var t0=null;
    function proj(lon,lat,l0,p0,R,cx,cy){var l=(lon-l0)*rad,p=lat*rad,q=p0*rad;var cosc=Math.sin(q)*Math.sin(p)+Math.cos(q)*Math.cos(p)*Math.cos(l);
      return [cx+R*Math.cos(p)*Math.sin(l),cy-R*(Math.cos(q)*Math.sin(p)-Math.sin(q)*Math.cos(p)*Math.cos(l)),cosc];}
    function slerp(a,b,f){var la1=a[1]*rad,lo1=a[0]*rad,la2=b[1]*rad,lo2=b[0]*rad;var A=[Math.cos(la1)*Math.cos(lo1),Math.cos(la1)*Math.sin(lo1),Math.sin(la1)],B=[Math.cos(la2)*Math.cos(lo2),Math.cos(la2)*Math.sin(lo2),Math.sin(la2)];
      var om=Math.acos(clamp(A[0]*B[0]+A[1]*B[1]+A[2]*B[2],-1,1));if(om<1e-6)return [a[0],a[1],om];var s1=Math.sin((1-f)*om)/Math.sin(om),s2=Math.sin(f*om)/Math.sin(om);var x=s1*A[0]+s2*B[0],y=s1*A[1]+s2*B[1],z=s1*A[2]+s2*B[2];return [Math.atan2(y,x)/rad,Math.atan2(z,Math.sqrt(x*x+y*y))/rad,om];}
    function drawGlobe(t){var f=fit(gc),c=f.c,W=f.W,H=f.H;c.clearRect(0,0,W,H);var R=Math.min(W,H)*.47,cx=W/2,cy=H/2;
      if(t0===null)t0=t;var el=RM?9:(t-t0)/1000;
      var l0=-24+Math.sin(el*.18)*10,p0=40;
      var g=c.createRadialGradient(cx-R*.3,cy-R*.4,R*.1,cx,cy,R);g.addColorStop(0,'#1F2F52');g.addColorStop(1,'#0B1120');c.fillStyle=g;c.beginPath();c.arc(cx,cy,R,0,6.283);c.fill();
      c.strokeStyle='rgba(143,227,234,.18)';c.lineWidth=1;c.stroke();
      if(dots){var ds=Math.max(1,R/150);for(var i=0;i<dots.length;i+=2){var q=proj(dots[i],dots[i+1],l0,p0,R,cx,cy);if(q[2]>0){c.fillStyle='rgba(170,190,225,'+(.18+q[2]*.5)+')';c.fillRect(q[0]-ds/2,q[1]-ds/2,ds,ds);}}}
      var prog=RM?1:(el%6)/2.2;
      for(var k=1;k<PL.length;k++){var to=PL[k].p,pts=[],steps=40,lim=Math.min(1,prog);
        var om=slerp(HOME,to,.5)[2];for(var s=0;s<=steps*lim;s++){var fr=s/steps,m=slerp(HOME,to,fr),lift=1+Math.sin(fr*Math.PI)*Math.min(.28,om*.35);var q2=proj(m[0],m[1],l0,p0,R,cx,cy);pts.push([cx+(q2[0]-cx)*lift,cy+(q2[1]-cy)*lift,q2[2]]);}
        c.strokeStyle='rgba(254,118,74,.9)';c.lineWidth=2;c.beginPath();var on=false;for(var s2=0;s2<pts.length;s2++){if(pts[s2][2]>-.05){if(!on){c.moveTo(pts[s2][0],pts[s2][1]);on=true;}else c.lineTo(pts[s2][0],pts[s2][1]);}else on=false;}c.stroke();}
      c.font='700 '+(W<420?11:13)+'px "Source Sans 3", sans-serif';
      PL.forEach(function(pl,i){var q3=proj(pl.p[0],pl.p[1],l0,p0,R,cx,cy);if(q3[2]<=0)return;var pu=RM?0:(Math.sin(el*3+i)+1)/2;
        c.fillStyle=pl.c;c.globalAlpha=.25+.25*pu;c.beginPath();c.arc(q3[0],q3[1],9+pu*6,0,6.283);c.fill();c.globalAlpha=1;c.beginPath();c.arc(q3[0],q3[1],4.5,0,6.283);c.fill();
        var sc2=W<420?.7:1,lx=q3[0]+pl.dx*sc2,ly=q3[1]+pl.dy*sc2;c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1;c.beginPath();c.moveTo(q3[0],q3[1]);c.lineTo(lx,ly);c.stroke();
        c.textAlign=pl.dx<0?'right':pl.dx>0?'left':'center';var tw=c.measureText(pl.n).width,bx=c.textAlign==='right'?lx-tw-8:c.textAlign==='left'?lx:lx-tw/2-4;
        c.fillStyle='rgba(11,17,32,.85)';c.fillRect(bx-4,ly-12,tw+16,20);c.fillStyle=pl.c===C.coral?'#FFB79E':'#fff';c.fillText(pl.n,c.textAlign==='right'?lx-4:c.textAlign==='left'?lx+4:lx,ly+3);});c.textAlign='left';}
    function load(){if(loading)return;loading=true;fetch('assets/globe-dots.json').then(function(r){return r.json();}).then(function(j){dots=j;if(RM)drawGlobe(0);}).catch(function(){});}
    once(gc,load,-600);
    if(RM){drawGlobe(0);w.addEventListener('resize',function(){drawGlobe(0);});}else loop(function(t){if(vis(gc))drawGlobe(t);});}

  /* clear days quiz */
  var qz=d.querySelector('[data-quiz]');
  if(qz){var fs=[].slice.call(qz.querySelectorAll('.qz')),score=qz.querySelector('.qz-score'),got=0,done=0;
    fs.forEach(function(f){var a=+f.getAttribute('data-a'),bs=[].slice.call(f.querySelectorAll('.qz-o button')),x=f.querySelector('.qz-x'),why=f.querySelector('.qz-why');why.hidden=true;
      bs.forEach(function(b,i){b.addEventListener('click',function(){bs.forEach(function(o){o.disabled=true;});bs[a].classList.add('right');
        if(i===a){got++;x.textContent='Right.';}else{b.classList.add('wrong');x.textContent='Not quite. It\'s '+bs[a].textContent+'.';}
        why.hidden=false;done++;if(done===fs.length)score.textContent=got===fs.length?'Three out of three. Nicely counted.':'You got '+got+' out of 3. Worth keeping the calculator to hand.';});});});}

  if(!RM&&loops.length)w.requestAnimationFrame(frame);
  runScroll();
})();
