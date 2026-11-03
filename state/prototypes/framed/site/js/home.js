(function(){
  var C=window.FramedCore,L=window.FRAMED_LEADS||[],esc=C.esc;
  // the voice, three companies, his offer marked as his site says it
  var pickIds=['sluyter','hells','robin','vao'];
  var pick=document.querySelector('[data-pick]'),letter=document.querySelector('[data-letter]');
  function markNl(t){var h=esc(t);
    ['€299 all in','onbeperkt prints','in jullie eigen stijl','in jullie stijl','in jullie huisstijl','met jullie jubileumlogo op de strip','December loopt snel vol.'].forEach(function(p){h=h.split(esc(p)).join('<mark class="site">'+esc(p)+'</mark>')});
    return h.replace(/\n/g,'<br>')}
  function show(id){var l=L.filter(function(x){return x.id===id})[0];if(!l)return;
    pick.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.id===id?'true':'false')});
    letter.innerHTML='<p class="to">To the '+esc(String(l.contactRole).split(/ \(| or |\//)[0].trim())+' at '+esc(l.name)+', from your LinkedIn</p>'+
      '<p class="nl" lang="nl">'+markNl(C.compose(l))+'</p>'+
      '<p class="en">'+esc(C.composeEn(l)).replace(/\n/g,'<br>')+'</p>'+
      '<p class="why">Why now. '+esc(l.signal)+' <a href="'+esc(l.sourceUrl)+'" target="_blank" rel="noopener">Read the source</a></p>'+
      '<p class="legend"><span><mark class="site" style="background:none;color:var(--wine);border-bottom:2px solid var(--lilac)">underlined</mark> is your offer as get-framed.com puts it</span></p>';
  }
  if(pick){pick.innerHTML=pickIds.map(function(id){var l=L.filter(function(x){return x.id===id})[0];return l?'<button type="button" data-id="'+id+'" aria-pressed="false"><span class="nm">'+esc(l.name)+'</span><span class="wh">'+esc(l.when)+'</span></button>':''}).join('');
    pick.addEventListener('click',function(e){var b=e.target.closest('button');if(b)show(b.dataset.id)});show(pickIds[0]);}

  // December, the nights fill as the two numbers move
  var grid=document.querySelector('[data-nights]');if(!grid)return;
  var ns=C.nights(),order=C.fillOrder(ns),today=new Date('2026-11-03T12:00:00');
  var h=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(function(d){return '<span class="dow">'+d+'</span>'}).join('');
  h+=ns.map(function(d,i){var w=d.getDay(),we=w===5||w===6;return '<div class="night'+(we?' we':'')+'" data-i="'+i+'"><span>'+d.getDate()+(d.getDate()===1||i===0?' '+C.mon(d):'')+'</span></div>'}).join('');
  grid.innerHTML=h;var cells=grid.querySelectorAll('.night');
  var st=C.settings();
  var ins={pw:document.querySelector('[data-in="pw"]'),rb:document.querySelector('[data-in="rb"]')};
  ins.pw.value=st.pw;ins.rb.value=st.rb;
  function draw(){st.pw=+ins.pw.value;st.rb=+ins.rb.value;C.saveSettings({pw:st.pw,rb:st.rb});
    document.querySelector('[data-v="pw"]').textContent=st.pw;document.querySelector('[data-v="rb"]').textContent=st.rb+'%';
    var r=C.calc(st),n=Math.round(r.bookings),cap=order.length*st.booths;n=Math.min(n,cap);
    var on={};order.slice(0,n).forEach(function(i){on[i]=1});
    cells.forEach(function(c,i){c.classList.toggle('on',!!on[i])});
    document.querySelector('[data-o="bk"]').textContent=n;document.querySelector('[data-o="eur"]').textContent=C.eur(n*st.price);document.querySelector('[data-o="rp"]').textContent=Math.round(r.replies);
  }
  ins.pw.addEventListener('input',draw);ins.rb.addEventListener('input',draw);draw();
})();
