(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  var KEY='hotgreen-shortlist', picks={};
  try{ picks=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ picks={}; }
  var names={}, order=[];
  [].forEach.call(d.querySelectorAll('.piece[data-id]'),function(el){ var id=el.getAttribute('data-id'); names[id]=el.getAttribute('data-name'); order.push(id); });
  Object.keys(picks).forEach(function(k){ if(!names[k]) delete picks[k]; });
  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(picks)); }catch(e){} }
  var list=d.getElementById('shortlist'), empty=d.getElementById('short-empty'), mail=d.getElementById('mail'),
      tray=d.getElementById('tray'), trayN=d.getElementById('tray-n'), trayT=d.getElementById('tray-t'), clr=d.getElementById('clear');
  function render(){
    var ids=order.filter(function(id){return picks[id];});
    [].forEach.call(d.querySelectorAll('[data-pick]'),function(b){
      var on=!!picks[b.getAttribute('data-pick')];
      b.setAttribute('aria-pressed',on?'true':'false');
      var host=b.closest('.piece')||b; host.classList.toggle('on',on);
    });
    list.innerHTML='';
    ids.forEach(function(id){ var li=d.createElement('li'); li.textContent=names[id]; list.appendChild(li); });
    empty.hidden=ids.length>0; clr.hidden=ids.length===0;
    var body='Hi Raka,\n\n'+(ids.length?'These are the parts we’d like to talk about.\n\n'+ids.map(function(id,i){return (i+1)+'. '+names[id];}).join('\n')+'\n':'')+'\n';
    mail.href='mailto:'+mail.getAttribute('data-to')+'?subject='+encodeURIComponent('HotGreen proposal')+'&body='+encodeURIComponent(body);
    tray.hidden=ids.length===0;
    trayN.textContent=ids.length;
    trayT.textContent=ids.length===1?'part on your shortlist':'parts on your shortlist';
  }
  d.addEventListener('click',function(e){
    var b=e.target.closest('[data-pick]'); if(b){ var id=b.getAttribute('data-pick'); if(picks[id]) delete picks[id]; else picks[id]=1; save(); render(); return; }
    if(e.target.closest('#clear')){ picks={}; save(); render(); }
  });
  render();
  var els=[].slice.call(d.querySelectorAll('.rv')), prog=d.getElementById('prog'), ticking=false;
  function check(){
    ticking=false;
    var h=window.innerHeight||root.clientHeight;
    els=els.filter(function(el){ var r=el.getBoundingClientRect(); if(r.top<h*0.94&&r.bottom>0){ el.classList.add('in'); return false; } return true; });
    var t=root.scrollHeight-root.clientHeight; prog.style.width=(t>0?(root.scrollTop||d.body.scrollTop)/t*100:0)+'%';
  }
  function req(){ if(!ticking){ ticking=true; requestAnimationFrame(check); } }
  window.addEventListener('scroll',req,{passive:true}); window.addEventListener('resize',req); window.addEventListener('load',req);
  check();
})();
