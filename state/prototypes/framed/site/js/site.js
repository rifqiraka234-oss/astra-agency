(function(){
  var BRK='<svg class="brk" viewBox="0 0 800 563" preserveAspectRatio="none" aria-hidden="true"><path d="M612,0 V10 Q612,30 592,30 H90 Q8,30 8,112 V420 Q8,466 54,466 H122"/><path d="M352,563 V520 Q352,468 404,468 H650 Q708,468 708,410 V92 Q708,38 750,38 Q792,38 792,92 V162"/></svg>';
  var store={get:function(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
  window.FramedStore=store; window.FramedBRK=BRK;
  var leads=(window.FRAMED_LEADS||[]);
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  function host(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return u}}
  function fmtDate(d){if(!d)return '';var m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];var p=d.split('-');return (+p[2])+' '+m[+p[1]-1]+' '+p[0]}
  window.FramedStrip=function(l,i){
    return '<article class="strip" data-id="'+esc(l.id)+'" style="--r:'+(i%3===0?'-1.6deg':i%3===1?'1.1deg':'-.6deg')+'">'+
      '<div class="fr f1">'+BRK+'<div><p class="co">'+esc(l.name)+'</p><p class="meta">'+esc(l.city)+', '+esc(l.sector)+'</p></div></div>'+
      '<div class="fr f2">'+BRK+'<span class="n">02 why now</span><div><p class="why">'+esc(l.signal)+'</p><a class="src" href="'+esc(l.sourceUrl)+'" target="_blank" rel="noopener">'+esc(host(l.sourceUrl))+', '+(l.signalDate>'2026-11-03'?'event on ':'')+esc(fmtDate(l.signalDate))+'</a></div></div>'+
      '<div class="fr f3">'+BRK+'<span class="n">03 your first line</span><p class="msg" lang="nl">'+esc(l.opener)+'</p></div>'+
      '<div class="fr f4">'+BRK+'<div><p class="stamp">'+esc(l.when)+'</p><p class="meta">'+esc(l.whenNote)+'</p></div></div>'+
      '<div class="foot"><img src="'+(window.FRAMED_ROOT||'')+'media/logo.png" alt="" width="800" height="563"><span class="n" style="font-family:var(--mono);font-size:10.5px;color:var(--muted)">'+esc(String(l.contactRole||'').split(/ \(| or |\//)[0].trim())+'</span></div>'+
      '<div class="keep"><button class="k" type="button" data-keep>Keep</button><button class="s" type="button" data-skip>Skip</button></div>'+
    '</article>';
  };
  function refreshCount(){var k=store.get('framed.kept',[]);document.querySelectorAll('[data-count]').forEach(function(e){e.textContent=k.length+' kept'});}
  function mark(el){var k=store.get('framed.kept',[]),s=store.get('framed.skipped',[]),id=el.getAttribute('data-id');el.classList.toggle('kept',k.indexOf(id)>-1);el.classList.toggle('skipped',s.indexOf(id)>-1)}
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-keep],[data-skip]');if(!b)return;
    var st=b.closest('.strip'),id=st.getAttribute('data-id');
    var k=store.get('framed.kept',[]),s=store.get('framed.skipped',[]);
    k=k.filter(function(x){return x!==id});s=s.filter(function(x){return x!==id});
    if(b.hasAttribute('data-keep'))k.push(id);else s.push(id);
    store.set('framed.kept',k);store.set('framed.skipped',s);mark(st);refreshCount();
  });
  window.FramedMark=mark; refreshCount();
  // fit the hero brackets to the headline's real text box, the way his logo frames "framed"
  function fitBrk(){var h=document.querySelector('.hero h1');if(!h)return;var svg=h.querySelector('.brk');var tn=[].slice.call(h.childNodes).filter(function(n){return n.nodeType===3&&n.textContent.trim()})[0];if(!tn)return;var r=document.createRange();r.selectNodeContents(tn);
    var rs=[].slice.call(r.getClientRects()).filter(function(x){return x.width>2&&x.height>2});var hb=h.getBoundingClientRect();
    var L=Infinity,T=Infinity,R=-Infinity,B=-Infinity;rs.forEach(function(x){L=Math.min(L,x.left);T=Math.min(T,x.top);R=Math.max(R,x.right);B=Math.max(B,x.bottom)});
    if(!isFinite(L))return;var w=R-L,ht=B-T;
    // text sits inside x 8%..84% and y 13%..79% of the logo box
    var W=w/0.76,H=ht/0.66;svg.style.left=(L-hb.left-W*0.08)+'px';svg.style.top=(T-hb.top-H*0.13)+'px';svg.style.width=W+'px';svg.style.height=H+'px';var top=T-hb.top-H*0.13;h.style.marginBottom=Math.max(24,top+H-hb.height+30)+'px';h.style.marginTop=Math.max(0,-top+10)+'px';}
  fitBrk();addEventListener('resize',fitBrk);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitBrk);


  var table=document.querySelector('.table'),booth=document.querySelector('.booth');
  if(!table||!booth)return;
  var screen=booth.querySelector('.screen'),flash=document.querySelector('.flash'),busy=false,next=0;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function wait(ms){return new Promise(function(r){setTimeout(r,reduce?0:ms)})}
  function say(h){screen.innerHTML=h}
  async function run(){
    if(busy||!leads.length)return;busy=true;
    var sec=document.querySelector(innerWidth<900?'.booth':'.stage');var r=sec.getBoundingClientRect();
    if(r.top>innerHeight*.4||r.bottom<innerHeight*.3){scrollTo(0,scrollY+r.top-(innerWidth<900?60:40));await wait(500)}
    for(var n=3;n>0;n--){say('<p class="num">'+n+'</p>');await wait(720)}
    booth.classList.add('fire');flash.classList.remove('go');void flash.offsetWidth;flash.classList.add('go');
    say('<p class="say">Gevonden!<br>Je strips worden geprint</p>');
    await wait(260);booth.classList.remove('fire');
    table.innerHTML='';
    for(var i=0;i<3;i++){
      var l=leads[(next+i)%leads.length];
      table.insertAdjacentHTML('beforeend',window.FramedStrip(l,i));
      var el=table.lastElementChild;mark(el);el.classList.add('print');
      await wait(650);
    }
    next=(next+3)%leads.length;
    await wait(900);say('<p class="say">Strike a pose!<br>De zoekopdracht start na de countdown</p>');busy=false;
  }
  document.querySelectorAll('[data-run]').forEach(function(b){b.addEventListener('click',run)});
  // print once by itself the first time the booth comes into view
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&en.intersectionRatio>.35){io.disconnect();run()}})},{threshold:[.35]});io.observe(document.querySelector('.stage'))}
})();
