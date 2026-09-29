(function(){
var d=document,W=window,RM=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches;
function seeded(s){return function(){s=(s*9301+49297)%233280;return s/233280}}

/* 1. The lens field. Every dot is a person in the market for one role. Grey dots aren't looking,
   blue dots applied to the advert, gold dots are strong fits who aren't looking. Illustration only. */
var lf=d.querySelector('.lensfield');
if(lf){
  var cv=lf.querySelector('canvas'),cx=cv.getContext('2d'),card=lf.querySelector('.cand'),dpr=Math.min(2,W.devicePixelRatio||1);
  var P=[],w=0,h=0,lens={x:0,y:0,tx:0,ty:0,r:120},mouse=false,last=0,t0=performance.now(),cardFor=-1;
  var CARDS=[
    ['Head of Sales, PPE distributor','Not applying','Open to a conversation'],
    ['Technical Sales Manager, power tool accessories','Not applying','Would move for the right role'],
    ['Operations Director, workwear manufacturer','Not applying','Open to a conversation'],
    ['Engineering Manager, precision manufacturing','Not applying','Happy where they are, listening'],
    ['Commercial Director, safety equipment','Not applying','Open to a conversation']];
  function build(){
    var r=cv.getBoundingClientRect();w=r.width;h=r.height;cv.width=w*dpr;cv.height=h*dpr;
    var rnd=seeded(7),gap=w<700?20:17,cols=Math.ceil(w/gap)+1,rows=Math.ceil(h/gap)+1;P=[];
    for(var y=0;y<rows;y++)for(var x=0;x<cols;x++){
      var k=rnd(),type=k<0.04?1:(k<0.068?2:0);
      P.push({x:x*gap+(rnd()-.5)*gap*.8,y:y*gap+(rnd()-.5)*gap*.8,t:type,ph:rnd()*6.28,c:type===2?Math.floor(rnd()*CARDS.length):0});
    }
    lens.r=w<700?74:150;if(!mouse){lens.x=lens.tx=w<760?w*.26:w*.68;lens.y=lens.ty=w<760?h*.15:h*.42}
  }
  function frame(now){
    var t=(now-t0)/1000;
    if(!mouse&&!RM){if(w<760){lens.tx=w*(.26+.06*Math.sin(t*.25));lens.ty=h*(.15+.03*Math.sin(t*.37+1))}else{lens.tx=w*(.62+.2*Math.sin(t*.23));lens.ty=h*(.38+.16*Math.sin(t*.37+1))}}
    lens.x+=(lens.tx-lens.x)*.12;lens.y+=(lens.ty-lens.y)*.12;
    cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,w,h);
    var best=-1,bd=1e9;
    for(var i=0;i<P.length;i++){var p=P[i],dx=p.x-lens.x,dy=p.y-lens.y,dd=dx*dx+dy*dy;
      if(dd<lens.r*lens.r)continue;
      cx.globalAlpha=p.t===1?.7+.25*Math.sin(t*2+p.ph):.5;cx.fillStyle=p.t===1?'#9FB2CC':'#6C7684';
      cx.beginPath();cx.arc(p.x,p.y,p.t===1?2.1:1.6,0,6.283);cx.fill();}
    cx.globalAlpha=1;
    // the lens, magnified 2.2x
    cx.save();cx.beginPath();cx.arc(lens.x,lens.y,lens.r,0,6.283);cx.clip();
    cx.fillStyle='rgba(250,247,240,.06)';cx.fillRect(lens.x-lens.r,lens.y-lens.r,lens.r*2,lens.r*2);
    var m=2.2;
    for(var j=0;j<P.length;j++){var q=P[j],ex=q.x-lens.x,ey=q.y-lens.y;
      if(Math.abs(ex)>lens.r/m+6||Math.abs(ey)>lens.r/m+6)continue;
      var X=lens.x+ex*m,Y=lens.y+ey*m;
      if(q.t===2){cx.shadowColor='#C9A34A';cx.shadowBlur=18;cx.fillStyle='#E6C878';cx.beginPath();cx.arc(X,Y,5.5,0,6.283);cx.fill();cx.shadowBlur=0;
        var dd2=ex*ex+ey*ey;if(dd2<bd){bd=dd2;best=j}}
      else{cx.fillStyle=q.t===1?'#9FB2CC':'#77808E';cx.beginPath();cx.arc(X,Y,q.t===1?3.6:2.8,0,6.283);cx.fill()}}
    cx.restore();
    cx.strokeStyle='#C9A34A';cx.lineWidth=4;cx.beginPath();cx.arc(lens.x,lens.y,lens.r,0,6.283);cx.stroke();
    cx.strokeStyle='rgba(230,200,120,.35)';cx.lineWidth=1;cx.beginPath();cx.arc(lens.x,lens.y,lens.r+7,0,6.283);cx.stroke();
    var a=.78;cx.strokeStyle='#C9A34A';cx.lineWidth=9;cx.lineCap='round';cx.beginPath();
    cx.moveTo(lens.x+Math.cos(a)*(lens.r+4),lens.y+Math.sin(a)*(lens.r+4));cx.lineTo(lens.x+Math.cos(a)*(lens.r*1.72),lens.y+Math.sin(a)*(lens.r*1.72));cx.stroke();
    if(card){
      if(best>=0){var c=CARDS[P[best].c];if(cardFor!==best){cardFor=best;card.querySelector('b').textContent=c[0];card.querySelector('.s1').textContent=c[1];card.querySelector('.s2').textContent=c[2]}
        var bx,by;if(w<760){bx=w-(card.offsetWidth||180)-12;by=Math.max(14,lens.y-60)}else{bx=lens.x-lens.r-270;by=lens.y-60;if(bx<12)bx=lens.x+lens.r+26;if(bx+260>w)bx=w-262;by=Math.max(90,Math.min(h-170,by))}card.style.left=bx+'px';card.style.top=by+'px';card.classList.add('on');}
      else{card.classList.remove('on');cardFor=-1}}
  }
  var vis=true;new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(lf);
  function loop(n){if(vis)frame(n);requestAnimationFrame(loop)}
  lf.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=cv.getBoundingClientRect();mouse=true;lens.tx=e.clientX-r.left;lens.ty=e.clientY-r.top;clearTimeout(last);last=setTimeout(function(){mouse=false},4000)});
  build();addEventListener('resize',function(){build();if(RM)frame(performance.now())});
  if(RM)frame(performance.now());else requestAnimationFrame(loop);
  lf.dataset.ready='1';
}

/* 2. the ONS line chart, drawn from assets/vacancies.json */
var ch=d.querySelector('[data-chart]');
if(ch){
  fetch('assets/vacancies.json').then(function(r){return r.json()}).then(function(S){
    var W0=720,H0=340,L=44,R=20,T=24,B=40,max=100,n=S.length;
    var X=function(i){return L+i*(W0-L-R)/(n-1)},Y=function(v){return T+(1-v/max)*(H0-T-B)};
    var pts=S.map(function(o,i){return X(i).toFixed(1)+','+Y(o.manu).toFixed(1)});
    var g='';[0,25,50,75,100].forEach(function(v){g+='<line class="ax" x1="'+L+'" x2="'+(W0-R)+'" y1="'+Y(v)+'" y2="'+Y(v)+'"/><text class="lbl" x="'+(L-8)+'" y="'+(Y(v)+4)+'" text-anchor="end">'+v+'k</text>'});
    var yrs='';S.forEach(function(o,i){if(o.p.indexOf('Dec-Feb')===0)yrs+='<text class="lbl" x="'+X(i)+'" y="'+(H0-12)+'" text-anchor="middle">'+o.p.slice(-4)+'</text>'});
    var pk=0;S.forEach(function(o,i){if(o.manu>S[pk].manu)pk=i});var la=n-1;
    ch.querySelector('svg').innerHTML='<defs><linearGradient id="fillg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#C9A34A" stop-opacity=".28"/><stop offset="1" stop-color="#C9A34A" stop-opacity="0"/></linearGradient></defs>'+g+yrs+
      '<polygon class="ar" points="'+X(0)+','+Y(0)+' '+pts.join(' ')+' '+X(la)+','+Y(0)+'"/>'+
      '<polyline class="ln" points="'+pts.join(' ')+'"/>'+
      '<g class="late"><circle class="pt" cx="'+X(pk)+'" cy="'+Y(S[pk].manu)+'" r="6"/><text class="ann" x="'+(X(pk)+10)+'" y="'+(Y(S[pk].manu)-10)+'">'+S[pk].manu+'k, '+S[pk].p.replace('-',' to ')+'</text>'+
      '<circle class="pt" cx="'+X(la)+'" cy="'+Y(S[la].manu)+'" r="6"/><text class="ann" x="'+(X(la)-8)+'" y="'+(Y(S[la].manu)-14)+'" text-anchor="end">'+S[la].manu+'k, '+S[la].p.replace('-',' to ')+'</text></g>';
    var ln=ch.querySelector('.ln');var len=ln.getTotalLength?Math.ceil(ln.getTotalLength()):2000;ln.style.setProperty('--len',len);
    ch.dataset.ready='1';
  });
}

/* reveal for chart and bars */
var rv=[].slice.call(d.querySelectorAll('.chart,.bars'));
function chk(){var hh=innerHeight;rv=rv.filter(function(e){if(e.getBoundingClientRect().top<hh*.82){e.classList.add('in');return false}return true})}
chk();addEventListener('scroll',chk,{passive:true});

/* 3. the funnel, pinned. An example search, the numbers illustrate the process. */
var fu=d.querySelector('.funnel');
if(fu){
  var STG=[
    [1200,'The market for your role','Everyone in the UK doing the job you need, or the job just below it. Most of them will never see your advert.','Understand'],
    [240,'Mapped','We map the market and the competitors, and pick out the people whose track record actually fits the brief.','Plan'],
    [60,'Approached, directly','Discreet approaches to people who aren’t looking. This is where a job board can’t follow.','Search'],
    [18,'Real conversations','The ones interested enough to talk, screened for capability, character and culture.','Assess'],
    [4,'Your shortlist','Every one of them purposeful. You meet people, not a pile of CVs.','Hire'],
    [1,'Your hire','Offer, negotiation and onboarding support, and we stay engaged after the start date.','Onboard']];
  var fc=fu.querySelector('canvas'),fx=fc.getContext('2d'),cnt=fu.querySelector('.count'),wh=fu.querySelector('.what'),ho=fu.querySelector('.how'),rl=[].slice.call(fu.querySelectorAll('.rail li'));
  var D=[],fw=0,fh=0,cur=-1,shown=1200,tgt=1200;
  function fbuild(){var r=fc.getBoundingClientRect();fw=r.width;fh=r.height;fc.width=fw*dpr;fc.height=fh*dpr;var rnd=seeded(11);D=[];
    var cxm=fw>760?fw*.64:fw*.5,cym=fw>760?fh*.5:fh*.36,R=Math.min(fw,fh)*(fw>760?.36:.34);
    for(var i=0;i<1200;i++){var a=rnd()*6.283,rr=Math.sqrt(rnd())*R;D.push({x:cxm+Math.cos(a)*rr,y:cym+Math.sin(a)*rr*.82,k:rnd(),cx:cxm,cy:cym})}
    D.sort(function(a,b){return((a.x-a.cx)*(a.x-a.cx)+(a.y-a.cy)*(a.y-a.cy))-((b.x-b.cx)*(b.x-b.cx)+(b.y-b.cy)*(b.y-b.cy))});}
  function fdraw(){fx.setTransform(dpr,0,0,dpr,0,0);fx.clearRect(0,0,fw,fh);var s=Math.round(shown);
    for(var i=0;i<D.length;i++){var p=D[i],on=i<s,last=s<=1&&i===0;
      var all=s>=1200;fx.globalAlpha=on?(last?1:(all?.55:.9)):.12;fx.fillStyle=last?'#E6C878':(on?(all?'#9AA4B2':(s<=4?'#E6C878':'#C9A34A')):'#5B6574');
      var rad=last?9:(on&&s<=18?5:(on?2.4:1.6));if(last){fx.shadowColor='#C9A34A';fx.shadowBlur=26}
      fx.beginPath();fx.arc(p.x,p.y,rad,0,6.283);fx.fill();fx.shadowBlur=0}
    fx.globalAlpha=1;}
  function fstep(){var r=fu.getBoundingClientRect(),span=fu.offsetHeight-innerHeight,p=Math.min(.999,Math.max(0,-r.top/span)),i=Math.floor(p*STG.length);
    if(i!==cur){cur=i;tgt=STG[i][0];cnt.textContent=STG[i][0].toLocaleString('en-GB');wh.textContent=STG[i][1];ho.textContent=STG[i][2];rl.forEach(function(li,k){li.classList.toggle('on',k===i)})}}
  var fvis=false;new IntersectionObserver(function(e){fvis=e[0].isIntersecting}).observe(fu);
  function floop(){if(fvis){fstep();shown+=(tgt-shown)*(RM?1:.12);fdraw()}requestAnimationFrame(floop)}
  if(RM){fu.classList.add('static')}else{fbuild();addEventListener('resize',fbuild);requestAnimationFrame(floop);fu.dataset.ready='1'}
}

/* 4. films, play only in view, pause respected */
[].forEach.call(d.querySelectorAll('video[data-auto]'),function(v){
  var user=false,btn=v.parentNode.querySelector('.vpp'),tm;
  if(RM){v.removeAttribute('autoplay');if(btn)btn.setAttribute('aria-pressed','true');}
  if(btn)btn.addEventListener('click',function(){user=!user;btn.setAttribute('aria-pressed',user?'true':'false');btn.setAttribute('aria-label',user?'Play film':'Pause film');user?v.pause():v.play().catch(function(){})});
  new IntersectionObserver(function(e){clearTimeout(tm);if(e[0].isIntersecting&&!user&&!RM){tm=setTimeout(function(){v.play().catch(function(){})},250)}else v.pause()},{threshold:.2}).observe(v);
});

/* 6. compare, user inputs only, ours is the 10% starting rate */
var cp=d.querySelector('[data-cmp]');
if(cp){var s=cp.querySelector('#cs'),a=cp.querySelector('#ca'),so=cp.querySelector('[for=cs]'),ao=cp.querySelector('[for=ca]'),
  th=cp.querySelector('[data-them]'),us=cp.querySelector('[data-us]'),sv=cp.querySelector('[data-save]'),bt=cp.querySelector('.them u'),bu=cp.querySelector('.us u');
  var f=function(n){return '£'+Math.round(n).toLocaleString('en-GB')};
  function up(){var sal=+s.value,pc=+a.value,t=sal*pc/100,u=sal*.1;so.textContent=f(sal);ao.textContent=pc+'%';th.textContent=f(t);us.textContent=f(u);sv.textContent=t>u?f(t-u):f(0);
    var mx=Math.max(t,u,1);bt.style.width=(t/mx*100)+'%';bu.style.width=(u/mx*100)+'%';s.setAttribute('aria-valuetext',f(sal));a.setAttribute('aria-valuetext',pc+'%')}
  s.addEventListener('input',up);a.addEventListener('input',up);up();}

/* 7. PRECISE */
var pr=d.querySelector('[data-pre]');
if(pr){var bx=d.querySelector('.prebox'),bs=[].slice.call(pr.querySelectorAll('button'));
  function sel(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});bx.querySelector('b').textContent=b.dataset.w;bx.querySelector('p').textContent=b.dataset.d}
  bs.forEach(function(b){b.addEventListener('click',function(){sel(b)})});sel(bs[0]);}
})();
