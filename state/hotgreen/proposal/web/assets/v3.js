(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');

  // the six parts you can pick
  var KEY='hotgreen-parts', picks={};
  try{ picks=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ picks={}; }
  var names={}, order=[];
  [].forEach.call(d.querySelectorAll('.tile[data-g]'),function(t){ var g=t.getAttribute('data-g'); names[g]=t.getAttribute('data-name'); order.push(g); });
  Object.keys(picks).forEach(function(k){ if(!names[k]) delete picks[k]; });
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(picks)); }catch(e){} }
  var box=d.getElementById('picked'), empty=d.getElementById('empty'), mail=d.getElementById('mail'), clr=d.getElementById('clear');
  function render(){
    var ids=order.filter(function(g){return picks[g];});
    [].forEach.call(d.querySelectorAll('[data-pick]'),function(b){
      var on=!!picks[b.getAttribute('data-pick')]; b.classList.toggle('on',on); b.setAttribute('aria-pressed',on?'true':'false');
    });
    [].forEach.call(d.querySelectorAll('.tile[data-g],.gchip[data-open]'),function(t){
      var g=t.getAttribute('data-g')||t.getAttribute('data-open'); t.classList.toggle('on',!!picks[g]);
    });
    box.innerHTML='';
    ids.forEach(function(g){
      var s=d.createElement('span'); s.className='pc g'+g;
      var l=d.createElement('span'); l.className='letter'; l.textContent=g; s.appendChild(l);
      s.appendChild(d.createTextNode(names[g])); box.appendChild(s);
    });
    empty.hidden=ids.length>0; clr.hidden=ids.length===0; box.hidden=ids.length===0;
    var body='Hi Raka,\n\n'+(ids.length?'These are the parts we’d like to talk about.\n\n'+ids.map(function(g){return g+'. '+names[g];}).join('\n')+'\n':'')+'\n';
    mail.href='mailto:'+mail.getAttribute('data-to')+'?subject='+encodeURIComponent('HotGreen proposal')+'&body='+encodeURIComponent(body);
  }

  // the panel for each part
  function show(dlg,btn){
    var img=dlg.querySelector('.viewer img'), cap=dlg.querySelector('.viewer .cap');
    [].forEach.call(dlg.querySelectorAll('.item'),function(i){ i.classList.toggle('on',i===btn); i.setAttribute('aria-pressed',i===btn?'true':'false'); });
    img.src=btn.getAttribute('data-src'); img.alt=btn.getAttribute('data-alt'); var fl=dlg.querySelector('.full'); if(fl) fl.href=btn.getAttribute('data-src');
    cap.innerHTML=''; var b=d.createElement('b'); b.textContent=btn.getAttribute('data-title'); cap.appendChild(b);
    cap.appendChild(d.createTextNode('. '+btn.getAttribute('data-kind')));
  }
  function open(g){
    var dlg=d.getElementById('dlg-'+g); if(!dlg) return;
    var first=dlg.querySelector('.item'); if(first) show(dlg,first);
    if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open','');
  }

  d.addEventListener('click',function(e){
    var t=e.target;
    var o=t.closest('[data-open]'); if(o){ e.preventDefault(); open(o.getAttribute('data-open')); return; }
    var p=t.closest('[data-pick]'); if(p){ var g=p.getAttribute('data-pick'); if(picks[g]) delete picks[g]; else picks[g]=1; save(); render(); return; }
    var it=t.closest('.item'); if(it){ show(it.closest('dialog'),it); return; }
    if(t.closest('[data-close]')){ t.closest('dialog').close(); return; }
    if(t.tagName==='DIALOG'){ t.close(); return; }
    if(t.closest('#clear')){ picks={}; save(); render(); }
  });
  render();

  // which step you are on, and a gentle reveal
  var secs=[].slice.call(d.querySelectorAll('section[data-step]')), links={};
  [].forEach.call(d.querySelectorAll('.steps a'),function(a){ links[a.getAttribute('href').slice(1)]=a; });
  var els=[].slice.call(d.querySelectorAll('.rv')), ticking=false;
  function check(){
    ticking=false;
    var h=window.innerHeight||root.clientHeight, cur=null;
    secs.forEach(function(s){ var r=s.getBoundingClientRect(); if(r.top<h*0.45) cur=s.id; });
    Object.keys(links).forEach(function(k){ links[k].classList.toggle('on',k===cur); });
    els=els.filter(function(el){ var r=el.getBoundingClientRect(); if(r.top<h*0.94&&r.bottom>0){ el.classList.add('in'); return false; } return true; });
  }
  function req(){ if(!ticking){ ticking=true; requestAnimationFrame(check); } }
  window.addEventListener('scroll',req,{passive:true}); window.addEventListener('resize',req); window.addEventListener('load',req);
  check();
})();
