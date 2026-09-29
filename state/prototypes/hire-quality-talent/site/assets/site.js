(function(){
  var d=document;
  // mobile menu
  var mb=d.querySelector('.menu-btn'),mn=d.getElementById('mnav');
  if(mb&&mn){
    mb.addEventListener('click',function(){var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':''});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&mn.classList.contains('open')){mn.classList.remove('open');mb.setAttribute('aria-expanded','false');d.body.style.overflow='';mb.focus()}});
  }
  // reveal
  var rv=[].slice.call(d.querySelectorAll('.rv'));
  function check(){var h=innerHeight;rv=rv.filter(function(el){if(el.getBoundingClientRect().top<h-40){el.classList.add('in');return false}return true})}
  check();addEventListener('scroll',check,{passive:true});addEventListener('resize',check);

  // fee estimator
  var est=d.querySelector('[data-est]');
  if(est){
    var r=est.querySelector('input[type=range]'),out=est.querySelector('output.sal'),fee=est.querySelector('[data-fee]'),
        pct=10,btns=[].slice.call(est.querySelectorAll('[data-pct]'));
    var f=function(n){return '£'+Math.round(n).toLocaleString('en-GB')};
    function upd(){var s=+r.value;out.textContent=f(s);fee.textContent=f(s*pct/100);r.setAttribute('aria-valuetext',f(s))}
    btns.forEach(function(b){b.addEventListener('click',function(){pct=+b.getAttribute('data-pct');btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});upd()})});
    r.addEventListener('input',upd);upd();
  }

  // contact form
  var fm=d.querySelector('form[data-form]');
  if(fm){
    fm.addEventListener('submit',function(e){
      e.preventDefault();var ok=true;
      [].forEach.call(fm.querySelectorAll('[required]'),function(i){
        var w=i.closest('.f'),bad=!i.value.trim()||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value));
        if(w)w.classList.toggle('bad',bad);if(bad&&ok){i.focus();ok=false}
      });
      if(!ok)return;
      var data=new URLSearchParams(new FormData(fm)).toString(),btn=fm.querySelector('button');btn.disabled=true;
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data}).then(function(res){
        if(!res.ok)throw 0;fm.style.display='none';d.querySelector('.sent').classList.add('on');
      }).catch(function(){btn.disabled=false;var er=fm.querySelector('.formerr');if(er)er.style.display='block'});
    });
  }
})();
