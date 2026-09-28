/* Qualigraf UK v4. Every scene runs only while it's on screen. Under reduced motion each one shows its end state. */
(function(){
  var d=document,w=window,root=d.documentElement;
  var RM=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR=Math.min(2,w.devicePixelRatio||1);
  function $(s,c){return (c||d).querySelector(s);} function $$(s,c){return [].slice.call((c||d).querySelectorAll(s));}
  function clamp(x,a,b){return x<a?a:x>b?b:x;} function sm(x,a,b){x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x);}
  function vis(el,pad){var r=el.getBoundingClientRect();pad=pad||0;return r.bottom>-pad&&r.top<w.innerHeight+pad;}
  function prog(el){var r=el.getBoundingClientRect(),span=r.height-w.innerHeight;return span>0?clamp(-r.top/span,0,1):(r.top<0?1:0);}
  var subs=[];function onScroll(fn){subs.push(fn);}
  var tick=false;function run(){tick=false;for(var i=0;i<subs.length;i++)subs[i]();}
  function req(){if(!tick){tick=true;w.requestAnimationFrame(run);}}
  w.addEventListener('scroll',req,{passive:true});w.addEventListener('resize',function(){req();});
  var loops=[];function loop(fn){loops.push(fn);} (function f(t){for(var i=0;i<loops.length;i++)loops[i](t);w.requestAnimationFrame(f);})(0);
  function fit(cv){var r=cv.getBoundingClientRect(),W=Math.max(1,Math.round(r.width)),H=Math.max(1,Math.round(r.height));if(cv.width!==W*DPR||cv.height!==H*DPR){cv.width=W*DPR;cv.height=H*DPR;}var c=cv.getContext('2d');c.setTransform(DPR,0,0,DPR,0,0);return {c:c,W:W,H:H};}
  function once(el,fn,pad){var done=false;function ck(){if(done)return;var r=el.getBoundingClientRect();if(r.top<w.innerHeight-(pad==null?80:pad)&&r.bottom>0){done=true;fn();}}onScroll(ck);setTimeout(ck,60);}
  function fmt(v,dp){return v.toLocaleString('en-GB',{maximumFractionDigits:dp||0});}

  /* header and menu */
  var hdr=$('.hdr');onScroll(function(){if(hdr)hdr.classList.toggle('sc',w.scrollY>10);});
  var mb=$('.menu-btn'),mn=$('#mnav');
  if(mb&&mn){mb.addEventListener('click',function(){var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':'';});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&mn.classList.contains('open')){mn.classList.remove('open');mb.setAttribute('aria-expanded','false');d.body.style.overflow='';mb.focus();}});
    $$('a',mn).forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('open');mb.setAttribute('aria-expanded','false');d.body.style.overflow='';});});}

  /* reveals */
  $$('.cf-strip li').forEach(function(li,i){li.style.setProperty('--i',i);});
  var rv=$$('.rv,.mask,.line-in,.cf-strip,.casefile,[data-count]');
  function countUp(el){var to=parseFloat(el.getAttribute('data-count')),suf=el.getAttribute('data-suffix')||'';if(RM){el.textContent=fmt(to)+suf;return;}var s=null;(function f(ts){if(!s)s=ts;var p=Math.min(1,(ts-s)/1400);p=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(to*p))+suf;if(p<1)w.requestAnimationFrame(f);})(performance.now());}
  onScroll(function(){var h=w.innerHeight;for(var i=0;i<rv.length;i++){var el=rv[i];if(el.__in)continue;var r=el.getBoundingClientRect();if(r.top<h-60){el.__in=true;el.classList.add('in');if(el.hasAttribute('data-count'))countUp(el);}}});
  var hero=$('.s-hero');if(hero)setTimeout(function(){hero.classList.add('in');},80);

  /* film, load and play near the screen, pause away from it, never autoplay under reduced motion */
  var PL='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 4l10 6-10 6z"/></svg>',PA='<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 4h3v12H5zM12 4h3v12h-3z"/></svg>';
  var vids=$$('video[data-auto]');
  vids.forEach(function(v){v.__user=RM?'paused':null;});
  $$('.vpp').forEach(function(b){var box=b.closest('.film');var v=box&&$('video',box);if(!v)return;
    function sync(){b.innerHTML=v.paused?PL:PA;b.setAttribute('aria-label',v.paused?'Play film':'Pause film');}
    v.addEventListener('play',sync);v.addEventListener('pause',sync);sync();
    b.addEventListener('click',function(){if(v.paused){v.__user='play';v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});}else{v.__user='paused';v.pause();}});});
  onScroll(function(){vids.forEach(function(v){var near=vis(v,w.innerHeight*.6),on=vis(v,0);
    
    if(v.__user==='paused')return;
    if(on&&v.paused){if(!v.__t){v.__t=setTimeout(function(){v.__t=null;if(vis(v,0)&&v.paused&&v.__user!=='paused'){v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});}},250);}}else if(!on){if(v.__t){clearTimeout(v.__t);v.__t=null;}if(!v.paused)v.pause();}});});

  /* hero progress, read by the WebGL module, captions and copy follow it */
  if(hero){var copy=$('.hero-copy',hero),cue=$('.hero-cue',hero),caps=$$('.hero-caps li',hero);
    onScroll(function(){var p=RM?0:prog(hero);w.__heroP=p;var co=1-sm(p,.05,.22);hero.style.setProperty('--co',co.toFixed(3));copy.style.setProperty('--cy',(p*140).toFixed(1));if(cue)cue.style.setProperty('--co',co.toFixed(3));
      var k=p<.14?-1:p<.4?0:p<.72?1:2;caps.forEach(function(c,i){c.classList.toggle('on',i===k);});});}

  /* 2, Surrey */
  var sy=$('.s-surrey');
  if(sy){
    var map=$('.sy-map',sy),gL=$('.lads',map),gP=$('.pins',map),lanes=$('.sy-lanes',sy),two=$('.sy-two',sy),steps=$$('.sy-step',sy),visBox=$('.sy-vis',sy),rows=$('.sy-rows',sy)||$('.sy-rows'),bar=$('.sy-prog',sy);
    var NS='http://www.w3.org/2000/svg',M=null,MT=null,SB=null,vb=[0,0,1000,1207],cur=vb.slice(),target=vb.slice();
    var SYS={'Surrey County Council':['e','mycouncil.surreycc.gov.uk',null],'Elmbridge':['e','mygov.elmbridge.gov.uk','Elmbridge'],'Epsom and Ewell':['e','democracy.epsom-ewell.gov.uk','Epsom and Ewell'],'Mole Valley':['e','molevalleydc.sharepoint.com','Mole Valley'],'Reigate and Banstead':['e','reigate-banstead.moderngov.co.uk','Reigate and Banstead'],'Tandridge':['e','tandridge.moderngov.co.uk','Tandridge'],
      'Guildford':['w','democracy.guildford.gov.uk','Guildford'],'Woking':['w','moderngov.woking.gov.uk','Woking'],'Waverley':['w','modgov.waverley.gov.uk','Waverley'],'Surrey Heath':['w','surreyheath.moderngov.co.uk','Surrey Heath'],'Runnymede':['w','democracy.runnymede.gov.uk','Runnymede'],'Spelthorne':['w','democracy.spelthorne.gov.uk','Spelthorne']};
    var ORDER=['Surrey County Council','Elmbridge','Epsom and Ewell','Mole Valley','Reigate and Banstead','Tandridge','Guildford','Woking','Waverley','Surrey Heath','Runnymede','Spelthorne'];
    Promise.all([fetch('assets/v4/england_map.json').then(function(r){return r.json();}),fetch('assets/v4/shadow_meetings.json').then(function(r){return r.json();})]).then(function(a){M=a[0];MT=a[1];build();}).catch(function(){});
    function el(t,at){var e=d.createElementNS(NS,t);for(var k in at)e.setAttribute(k,at[k]);return e;}
    function centroid(p){var n=p.getTotalLength?0:0;var b=p.getBBox();return [b.x+b.width/2,b.y+b.height/2];}
    function build(){
      gL.innerHTML='';gP.innerHTML='';map.setAttribute('viewBox',vb.join(' '));SB=M.surrey;var cent={};
      M.lads.forEach(function(o){var p=el('path',{d:o.d});if(o.s)p.setAttribute('class',o.s);p.setAttribute('data-n',o.n);gL.appendChild(p);});
      M.lads.forEach(function(o){if(o.s){var p=gL.querySelector('[data-n="'+o.n+'"]');cent[o.n]=centroid(p);}});
      var sc=[(SB[0]+SB[2])/2,(SB[1]+SB[3])/2];cent['Surrey County Council']=[sc[0]+2,sc[1]+4];
      /* numbered pins on the map, a readable key beside it */
      var counts={};['East Surrey','West Surrey'].forEach(function(s){(MT[s]||[]).forEach(function(r){counts[r.system]=(counts[r.system]||0)+1;});});
      ORDER.forEach(function(nm,i){var c=cent[nm],g=el('g',{'class':'pin'});g.appendChild(el('circle',{cx:c[0],cy:c[1],r:3.1}));var t=el('text',{x:c[0],y:c[1]+1.2,'font-size':3.2,'text-anchor':'middle'});t.textContent=String(i+1);g.appendChild(t);gP.appendChild(g);});
      var key=d.createElement('div');key.className='sy-key';
      key.innerHTML=['e','w'].map(function(side){return '<div class="'+side+'"><p class="mono">'+(side==='e'?'East Surrey shadow authority':'West Surrey shadow authority')+'</p><ol>'+ORDER.map(function(nm,i){return SYS[nm][0]===side?'<li><b>'+(i+1)+'</b><span>'+nm+'</span><code>'+SYS[nm][1]+'</code></li>':'';}).join('')+'</ol></div>';}).join('');
      visBox.appendChild(key);
      /* table */
      if(rows){rows.innerHTML=ORDER.map(function(nm){return '<tr><td>'+(SYS[nm][0]==='e'?'East Surrey':'West Surrey')+'</td><td>'+nm+'</td><td>'+SYS[nm][1]+'</td><td>'+(counts[nm]||0)+'</td></tr>';}).join('');}
      /* lanes, one per system, a dot per meeting on a May 2026 to April 2027 axis */
      var t0=Date.UTC(2026,4,1),t1=Date.UTC(2027,3,15),today=Date.UTC(2026,8,28),vest=Date.UTC(2027,3,1);function x(t){return ((t-t0)/(t1-t0)*100).toFixed(2)+'%';}
      var h='';ORDER.forEach(function(nm,i){h+='<div class="lane"><span>'+nm+'</span><div class="track" data-sys="'+nm+'"></div></div>';});
      h+='<div class="axis">'+[[2026,4,'May'],[2026,6,'Jul'],[2026,8,'Sep'],[2026,10,'Nov'],[2027,0,'Jan'],[2027,2,'Mar']].map(function(m){return '<span style="left:'+x(Date.UTC(m[0],m[1],1))+'">'+m[2]+'</span>';}).join('')+'</div>';
      lanes.innerHTML=h;
      var trackBox=lanes.querySelector('.track');
      var vl=d.createElement('div');vl.className='vline';vl.innerHTML='<b>Today, 28 Sep</b>';lanes.appendChild(vl);
      var vv=d.createElement('div');vv.className='vline vest';vv.innerHTML='<b>1 April 2027</b>';lanes.appendChild(vv);
      function placeV(){var tb=trackBox.getBoundingClientRect(),lb=lanes.getBoundingClientRect();[[vl,today],[vv,vest]].forEach(function(a){a[0].style.left=(tb.left-lb.left+tb.width*(a[1]-t0)/(t1-t0))+'px';});}
      ['East Surrey','West Surrey'].forEach(function(s){(MT[s]||[]).forEach(function(r){var p=r.date.split('-'),t=Date.UTC(+p[0],+p[1]-1,+p[2]);var dot=d.createElement('i');dot.className='mt '+SYS[r.system][0]+(t>today?' fut':'');dot.style.left=x(t);dot.title=r.committee+', '+r.date;lanes.querySelector('.track[data-sys="'+r.system+'"]').appendChild(dot);});});
      placeV();w.addEventListener('resize',placeV);
      stage=-1;req();
    }
    var stage=-1;
    function setStage(k){if(k===stage)return;stage=k;steps.forEach(function(s,i){s.classList.toggle('on',i===k);});
      map.classList.toggle('pins-on',k===1);var ky=$('.sy-key',sy);if(ky)ky.classList.toggle('on',k===1);lanes.classList.toggle('on',k===2);two.classList.toggle('on',k===3);visBox.className='sy-vis s'+k;
      if(SB){if(k===0)target=[0,0,1000,1207];else{var pad=k===1?16:26,W=SB[2]-SB[0]+pad*2,H=SB[3]-SB[1]+pad*2;var bx=SB[0]-pad,by=SB[1]-pad;if(k>=2){H=H*1.0;}target=[bx,by,W,H];}}}
    function mobile(){return w.innerWidth<=900||RM||sy.classList.contains('static');}
    onScroll(function(){if(mobile()){if(stage!==9){stage=9;steps.forEach(function(s){s.classList.add('on');});map.classList.add('pins-on');var ky=$('.sy-key',sy);if(ky)ky.classList.add('on');lanes.classList.add('on');two.classList.add('on');if(SB){var p=10;target=[SB[0]-p,SB[1]-p,SB[2]-SB[0]+p*2,SB[3]-SB[1]+p*2];cur=target.slice();map.setAttribute('viewBox',cur.join(' '));}}return;}
      var p=prog(sy);if(bar)bar.style.setProperty('--p',p.toFixed(3));setStage(p<.2?0:p<.45?1:p<.72?2:3);});
    var lastT=0;loop(function(t){var dt=lastT?Math.min(.25,(t-lastT)/1000):0;lastT=t;if(!SB||mobile()||!vis(sy))return;var k=1-Math.exp(-dt*5.5),moved=false;for(var i=0;i<4;i++){var dlt=target[i]-cur[i];if(Math.abs(dlt)>.05){cur[i]+=dlt*k;moved=true;}}if(moved)map.setAttribute('viewBox',cur.map(function(v){return v.toFixed(2);}).join(' '));});
  }

  /* 4, the strip, sideways while pinned */
  var st=$('.s-strip');
  if(st){var track=$('.strip-track',st),sbar=$('.strip-bar',st),sdots=$$('.strip-dots li',st),panels=$$('.panel',st);
    function layout(){var ok=w.innerWidth>900&&!RM;st.classList.toggle('pinnable',ok);if(!ok){st.style.height='';track.style.transform='';return;}
      var dist=track.scrollWidth-w.innerWidth+ (parseFloat(getComputedStyle(track).paddingLeft)||0);st.style.height=(dist+w.innerHeight*1.15)+'px';st.__dist=Math.max(0,dist);}
    layout();w.addEventListener('resize',function(){layout();req();});w.addEventListener('load',function(){layout();req();});
    onScroll(function(){if(!st.classList.contains('pinnable'))return;var p=prog(st);track.style.transform='translate3d('+(-p*st.__dist).toFixed(1)+'px,0,0)';sbar.style.setProperty('--sp',p.toFixed(3));var k=Math.min(7,Math.floor(p*8.0001));sdots.forEach(function(li,i){li.classList.toggle('on',i===k);});});
    /* per panel moments */
    panels.forEach(function(pn){var r=$('.route',pn),b=$('.board',pn),ty=$('.typing-line .tx',pn);
      function inside(){var rr=pn.getBoundingClientRect();return rr.left<w.innerWidth*.8&&rr.right>w.innerWidth*.2&&rr.top<w.innerHeight&&rr.bottom>0;}
      var done=false;onScroll(function(){if(done||!inside())return;done=true;
        if(r){$$('li',r).forEach(function(li,i){setTimeout(function(){li.classList.add('ok');},RM?0:300+i*450);});}
        if(b){setTimeout(function(){b.classList.add('go');$$('[data-v]',b).forEach(function(n){var to=+n.getAttribute('data-v');if(RM){n.textContent=to;return;}var s=null;(function f(ts){if(!s)s=ts;var q=Math.min(1,(ts-s)/1400);n.textContent=Math.round(to*q);if(q<1)w.requestAnimationFrame(f);})(performance.now());});},RM?0:300);}
        if(ty&&!RM){var full=ty.textContent;ty.textContent='';var i=0;var iv=setInterval(function(){i++;ty.textContent=full.slice(0,i);if(i>=full.length)clearInterval(iv);},38);}});});
  }

  /* 3, paper calculator */
  var wf=$('[data-wrapped]');
  if(wf){function num(n){var v=parseFloat(wf.elements[n].value);return isFinite(v)&&v>0?v:0;}
    function calc(){var m=num('m'),p=num('p'),g=num('g'),pages=Math.round(m*p*g),metres=pages*0.0001;
      $('[data-w="pages"]').textContent=fmt(pages);$('[data-w="metres"]').textContent=metres<0.01?'under 0.01':metres<10?fmt(metres,2):fmt(metres,1);$('[data-w="deadlines"]').textContent=fmt(Math.round(m));}
    wf.addEventListener('input',calc);calc();}

  /* quiz */
  var qz=$('[data-quiz]');
  if(qz){var fs=$$('.qz',qz),score=$('.qz-score',qz),got=0,done=0;
    fs.forEach(function(f){var a=+f.getAttribute('data-a'),bs=$$('.qz-o button',f),x=$('.qz-x',f),why=$('.qz-why',f);why.hidden=true;
      bs.forEach(function(b,i){b.addEventListener('click',function(){bs.forEach(function(o){o.disabled=true;});bs[a].classList.add('right');
        if(i===a){got++;x.textContent='Right.';}else{b.classList.add('wrong');x.textContent='Not quite. It\'s '+bs[a].textContent+'.';}
        why.hidden=false;done++;if(done===fs.length)score.textContent=got===fs.length?'Three out of three. Nicely counted.':'You got '+got+' out of 3. Worth keeping the calculator to hand.';});});});}

  /* 6, scoreboard */
  var hud=$('[data-hud]');
  if(hud){var tc=$('[data-tc]',hud),spk=$('[data-spk]',hud),spi=$('[data-spi]',hud),vt=$('[data-votes]',hud),secs=19*3600+4*60+12,si=0;
    var S=[['Chair','Item 4.1'],['Portfolio holder','Item 4.1, introducing the report'],['Opposition group leader','Item 4.1, a question'],['Monitoring Officer','Item 4.1, advice to the meeting'],['Chair','Item 4.1, moving to the vote']];
    function pad2(x){return (x<10?'0':'')+x;}
    function votes(){hud.classList.remove('done');vt.classList.remove('go');$$('[data-v]',vt).forEach(function(b){b.textContent='0';});
      setTimeout(function(){vt.classList.add('go');$$('[data-v]',vt).forEach(function(b){var to=+b.getAttribute('data-v'),s0=null;(function f(ts){if(!s0)s0=ts;var q=Math.min(1,(ts-s0)/1400);b.textContent=Math.round(to*q);if(q<1)w.requestAnimationFrame(f);})(performance.now());});},300);
      setTimeout(function(){hud.classList.add('done');},1900);}
    once(hud,function(){if(RM){vt.classList.add('go');hud.classList.add('done');return;}votes();
      setInterval(function(){if(!vis(hud))return;secs++;tc.textContent=pad2(Math.floor(secs/3600))+'.'+pad2(Math.floor(secs/60)%60)+'.'+pad2(secs%60);
        if(secs%4===0){si=(si+1)%S.length;spk.textContent=S[si][0];spi.textContent=S[si][1];}if(secs%20===0)votes();},1000);},60);}

  /* 7, minutes pipeline and its waveform */
  var pipe=$('[data-pipe]');
  if(pipe){var li=$$('li',pipe),wv=$('.pp-wave',pipe),bars=[];for(var b=0;b<48;b++)bars.push(.2+Math.random()*.8);
    once(pipe,function(){li.forEach(function(x,i){setTimeout(function(){x.classList.add('on');},RM?0:i*800);});},120);
    function drawWave(t){var f=fit(wv),c=f.c,W=f.W,H=f.H;c.clearRect(0,0,W,H);var n=bars.length,bw=W/n;
      for(var i=0;i<n;i++){var a=RM?bars[i]:(.3+.7*Math.abs(Math.sin(t*.003+i*.55)*Math.cos(t*.0013+i*.21)));var bh=Math.max(3,a*H*.9);c.fillStyle=i%3?'#12141B':'#FE764A';c.fillRect(i*bw+bw*.22,H/2-bh/2,bw*.56,bh);}}
    if(wv){if(RM){drawWave(0);w.addEventListener('resize',function(){drawWave(0);});}else loop(function(t){if(vis(wv))drawWave(t);});}}

  /* 8, archive wall */
  var arc=$('[data-archive]');
  if(arc){var cv=$('.arc-wall',arc),inp=$('input',arc),chips=$$('.arc-chips button',arc),res=$('.arc-res',arc);
    var COLS=72,ROWS=22,TOT=COLS*ROWS,base=[],lit=[],litT=0;for(var i=0;i<TOT;i++)base.push(Math.random());
    var SETS={'parking main street':[['Council proposal, parking Main Street','Report'],['Motion Green Parking','Motion'],['Traffic density report for main street','Background']],
      'city centre plan':[['Progress report on the city centre development plan','Report'],['Decision, city centre development plan','Decision'],['Webcast, Full Council, item 4.1','Webcast']],
      'traffic':[['Research report on traffic','Report'],['Traffic density report for main street','Background'],['Motion Green Parking','Motion']]};
    function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
    function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
    function runQ(qs){qs=(qs||'').trim().toLowerCase();var set=SETS[qs],n=0;lit=[];
      if(qs){var h=hash(qs);n=set?set.length:3+(h%5);for(var i=0;i<n;i++){h=Math.imul(h^(h>>>13),2654435761)>>>0;var ix=h%TOT;if(ix%COLS%12===11)ix--;lit.push(ix);}}
      litT=performance.now();chips.forEach(function(c){c.setAttribute('aria-pressed',c.textContent===qs?'true':'false');});
      var html='<p class="arc-n"><b>'+n+'</b> '+(n===1?'match':'matches')+' among '+fmt(TOT)+' sample documents</p>';
      if(set)html+='<ul>'+set.map(function(r){return '<li>'+esc(r[0])+'<span>'+esc(r[1])+'</span></li>';}).join('')+'</ul>';
      else if(qs)html+='<p class="small">A sample archive. In yours, the same search finds reports, decisions, motions and webcasts by topic.</p>';
      else html+='<p class="small">Type a search, or pick a sample.</p>';res.innerHTML=html;if(RM)drawArc(0);}
    function drawArc(t){var f=fit(cv),c=f.c,W=f.W,H=f.H;c.clearRect(0,0,W,H);var cw=W/COLS,rh=H/ROWS,g=Math.max(.6,cw*.2);var sweep=RM?2:(t-litT)/1000*1.6;
      for(var i=0;i<TOT;i++){var col=i%COLS;if(col%12===11)continue;var x=col*cw,y=Math.floor(i/COLS)*rh;c.fillStyle='rgba(243,238,227,'+(.06+base[i]*.2)+')';c.fillRect(x+g/2,y+g/2,cw-g,rh-g);}
      if(!RM&&sweep<1.2){var sx=sweep*W,gr=c.createLinearGradient(sx-80,0,sx,0);gr.addColorStop(0,'rgba(254,118,74,0)');gr.addColorStop(1,'rgba(254,118,74,.45)');c.fillStyle=gr;c.fillRect(sx-80,0,80,H);}
      for(var k=0;k<lit.length;k++){var j=lit[k],x2=(j%COLS)*cw,y2=Math.floor(j/COLS)*rh;if(!RM&&x2>sweep*W)continue;var pu=RM?1:(.6+.4*Math.sin(t*.005+k)),rr=Math.max(cw,rh)*3.4;var gg=c.createRadialGradient(x2+cw/2,y2+rh/2,0,x2+cw/2,y2+rh/2,rr);gg.addColorStop(0,'rgba(254,118,74,'+(.7*pu)+')');gg.addColorStop(1,'rgba(254,118,74,0)');c.fillStyle=gg;c.beginPath();c.arc(x2+cw/2,y2+rh/2,rr,0,6.283);c.fill();c.fillStyle='#FE764A';c.fillRect(x2-cw*.4,y2-rh*.4,cw*1.8,rh*1.8);}}
    var deb;inp.addEventListener('input',function(){clearTimeout(deb);deb=setTimeout(function(){runQ(inp.value);},220);});
    chips.forEach(function(ch){ch.addEventListener('click',function(){inp.value=ch.textContent;runQ(ch.textContent);});});
    runQ(inp.value);
    if(RM)w.addEventListener('resize',function(){drawArc(0);});else{loop(function(t){if(vis(cv))drawArc(t);});once(arc,function(){runQ(inp.value);},100);}}

  /* clear days calculator on inner pages, Elitestone clear days, GOV.UK England and Wales bank holidays */
  var BH=['2026-01-01','2026-04-03','2026-04-06','2026-05-04','2026-05-25','2026-08-31','2026-12-25','2026-12-28','2027-01-01','2027-03-26','2027-03-29','2027-05-03','2027-05-31','2027-08-30','2027-12-27','2027-12-28','2028-01-03','2028-04-14','2028-04-17','2028-05-01','2028-05-29','2028-08-28','2028-12-25','2028-12-26'];
  function iso(x){return x.getFullYear()+'-'+('0'+(x.getMonth()+1)).slice(-2)+'-'+('0'+x.getDate()).slice(-2);}
  function isWork(x){var g=x.getDay();return g>0&&g<6&&BH.indexOf(iso(x))<0;}
  function add(x,n){return new Date(x.getFullYear(),x.getMonth(),x.getDate()+n);}
  var DN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
  function nice(x){return DN[x.getDay()]+' '+x.getDate()+' '+MN[x.getMonth()]+' '+x.getFullYear();}
  $$('[data-calc]').forEach(function(c){var inp=$('input[type=date]',c),out=$('.out',c);if(!inp||!out)return;
    function go(){var v=inp.value;if(!/^\d{4}-\d{2}-\d{2}$/.test(v)){out.innerHTML='<p class="small">Pick the date of the meeting.</p>';return;}
      var p=v.split('-'),m=new Date(+p[0],+p[1]-1,+p[2]),clear=[],x=add(m,-1),guard=0;while(clear.length<5&&guard<40){if(isWork(x))clear.push(x);x=add(x,-1);guard++;}
      var pub=add(clear[4],-1);while(!isWork(pub))pub=add(pub,-1);
      out.innerHTML='<p class="mono">Latest day to publish the agenda and reports</p><p class="big">'+nice(pub)+'</p><p class="small">Five clear working days before the meeting on '+nice(m)+'. Weekends and bank holidays don\'t count, and neither does the day you publish or the day you meet.</p>';}
    inp.addEventListener('input',go);inp.addEventListener('change',go);go();});

  /* forms, validate then POST to Netlify Forms */
  $$('form[data-form]').forEach(function(f){var wrap=f.closest('.form-wrap')||f.parentNode,err=$('.formerr',wrap);
    function vf(fl){var i=$('input,select,textarea',fl);if(!i)return true;var v=(i.value||'').trim(),ok=true;if(i.hasAttribute('required')&&!v)ok=false;if(ok&&i.type==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))ok=false;if(ok&&i.type==='checkbox'&&i.hasAttribute('required')&&!i.checked)ok=false;fl.classList.toggle('bad',!ok);i.setAttribute('aria-invalid',ok?'false':'true');return ok;}
    f.addEventListener('submit',function(e){e.preventDefault();var bad=null;$$('.field',f).forEach(function(fl){if(!vf(fl)&&!bad)bad=fl;});if(bad){var i=$('input,select,textarea',bad);if(i)i.focus();return;}
      var btn=$('[type=submit]',f),lbl=btn.innerHTML;btn.disabled=true;btn.textContent='Sending…';if(err)err.classList.remove('show');
      fetch(f.getAttribute('action')||'/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()}).then(function(r){if(!r.ok)throw new Error(r.status);wrap.classList.add('sent');var h=$('.ok h3',wrap);if(h){h.setAttribute('tabindex','-1');h.focus();}}).catch(function(){btn.disabled=false;btn.innerHTML=lbl;if(err)err.classList.add('show');});});});

  /* checklist */
  $$('[data-checklist]').forEach(function(l){var bx=$$('input[type=checkbox]',l),pr=$('.prog i',l),lab=$('.prog-l',l);function up(){var n=bx.filter(function(b){return b.checked;}).length;if(pr)pr.style.transform='scaleX('+(n/bx.length)+')';if(lab)lab.textContent=n+' of '+bx.length+' ready';}bx.forEach(function(b){b.addEventListener('change',up);});up();});

  /* countdown */
  $$('[data-countdown]').forEach(function(c){var t=c.getAttribute('data-countdown').split('-'),to=new Date(+t[0],+t[1]-1,+t[2]),now=new Date(),days=Math.ceil((to-new Date(now.getFullYear(),now.getMonth(),now.getDate()))/864e5);if(days>0){c.innerHTML='<b>'+days+'</b><span>'+(c.getAttribute('data-label')||'days')+'</span>';}});

  /* sticky section index */
  $$('.index').forEach(function(ix){var ls=$$('a[href^="#"]',ix),secs=ls.map(function(a){return d.getElementById(a.getAttribute('href').slice(1));});
    onScroll(function(){var k=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<w.innerHeight*.35)k=i;});ls.forEach(function(a,i){a.classList.toggle('on',i===k);if(i===k&&a.scrollIntoView&&ix.__k!==k){ix.__k=k;var ol=a.parentNode.parentNode;ol.scrollTo({left:a.offsetLeft-40,behavior:'auto'});}});});});

  req();w.addEventListener('load',req);
})();
