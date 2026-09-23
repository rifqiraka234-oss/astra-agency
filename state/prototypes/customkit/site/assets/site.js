(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};

  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* menu */
  var mb=$('.menu-btn'), mn=$('#mnav');
  if(mb&&mn){mb.addEventListener('click',function(){var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false');document.body.style.overflow=o?'hidden':''})}

  /* brands dropdown, for touch and keyboard */
  $$('.dd>button').forEach(function(b){var d=b.parentNode;
    function shut(){d.classList.remove('open');d.classList.add('shut');b.setAttribute('aria-expanded','false')}
    b.addEventListener('click',function(){if(d.classList.contains('open')){shut();return}d.classList.remove('shut');d.classList.add('open');b.setAttribute('aria-expanded','true')});
    document.addEventListener('click',function(e){if(!d.contains(e.target)){d.classList.remove('open');b.setAttribute('aria-expanded','false')}});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'){shut();b.focus()}});
    d.addEventListener('mouseleave',function(){d.classList.remove('shut')});
    d.addEventListener('focusout',function(e){if(!d.contains(e.relatedTarget))d.classList.remove('shut')})});

  /* scroll progress under the header */
  var pl=$('.prog-line');
  if(pl){var tk=false;function sp(){var h=document.documentElement,m=h.scrollHeight-innerHeight;pl.style.setProperty('--p',m>0?(scrollY/m).toFixed(4):0);tk=false}
    addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(sp)}},{passive:true});sp()}

  /* rail buttons */
  $$('[data-rail]').forEach(function(b){var r=document.getElementById(b.getAttribute('data-rail'));if(!r)return;
    b.addEventListener('click',function(){r.scrollBy({left:(b.hasAttribute('data-prev')?-1:1)*r.clientWidth*.8,behavior:RM?'auto':'smooth'})})});

  /* reveal, never forced. a position check, because IntersectionObserver ignores an element
     whose own clip-path hides it, which is exactly what the wipe does */
  var els=$$('.rv, .chart'),rq=false;
  function reveal(){rq=false;var lim=innerHeight*.94;els=els.filter(function(e){var r=e.getBoundingClientRect();if(r.top<lim&&r.bottom>-40){e.classList.add('in');return false}return true})}
  function ask(){if(!rq){rq=true;requestAnimationFrame(reveal)}}
  addEventListener('scroll',ask,{passive:true});addEventListener('resize',ask);addEventListener('load',ask);reveal();
  $$('.rail').forEach(function(r){r.addEventListener('scroll',ask,{passive:true})});

  var yr=$('#yr'); if(yr) yr.textContent=new Date().getFullYear();

  /* split flap numbers. the real text stays in the markup for no script and screen readers */
  var FL='0123456789ABCDEFGHKMNORSTW';
  $$('[data-flap]').forEach(function(el){var txt=el.textContent.trim();el.setAttribute('aria-label',txt);el.textContent='';
    var cells=txt.split('').map(function(ch){var c=document.createElement('span');c.className='flap'+(ch===' '?' sp':'');c.setAttribute('aria-hidden','true');c.textContent=ch===' '?'':ch;el.appendChild(c);return {el:c,ch:ch}});
    if(RM||!('IntersectionObserver' in window))return;
    cells.forEach(function(c){if(c.ch!==' ')c.el.textContent=FL[Math.random()*FL.length|0]});
    var o=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;o.disconnect();
      cells.forEach(function(c,i){if(c.ch===' ')return;var n=8+i*4,k=0;(function step(){if(k++>=n){c.el.textContent=c.ch;return}
        c.el.textContent=FL[Math.random()*FL.length|0];c.el.classList.remove('flip');void c.el.offsetWidth;c.el.classList.add('flip');setTimeout(step,55)})()})},{threshold:.4});
    o.observe(el)});

  /* colourways */
  var COLS={
    gold:['#b49a64','Gold'],black:['#16181b','Black'],white:['#f1f1ec','White'],navy:['#1c2b4a','Navy'],
    royal:['#1f5bbf','Royal blue'],sky:['#7db2df','Sky blue'],red:['#b8261f','Red'],claret:['#6b1d33','Claret'],
    green:['#1f6b3b','Green'],orange:['#d7661d','Orange'],yellow:['#e3bf2a','Yellow'],teal:['#17a393','Teal'],
    grey:['#4a4d52','Charcoal']
  };
  var DESIGNS={vortex:'Vortex',ripple:'Ripple',paint:'Paint',voltz:'Voltz',classic07:'Classic 07',hoops:'Hoops'};
  function hex(h){h=h.replace('#','');return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]}
  function hsl(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,h=0,s=0,d=mx-mn;
    if(d){s=l>.5?d/(2-mx-mn):d/(mx+mn);if(mx===r)h=((g-b)/d+(g<b?6:0));else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60}
    return [h,s,l]}
  var cache={};
  function prep(img){
    var key=img.getAttribute('src'); if(cache[key]) return cache[key];
    var w=img.naturalWidth,h=img.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;
    var x=c.getContext('2d');x.drawImage(img,0,0);var d=x.getImageData(0,0,w,h),p=d.data,n=w*h;
    var cls=new Uint8Array(n),lum=new Float32Array(n),s1=[],s2=[];
    for(var i=0;i<n;i++){var a=p[i*4+3];if(a<10)continue;var q=hsl(p[i*4],p[i*4+1],p[i*4+2]);lum[i]=q[2];
      if(q[1]>.12&&q[0]>=140&&q[0]<=210&&q[2]>.06){cls[i]=1;if(i%7===0)s1.push(q[2])}
      else if(q[1]<.2&&q[2]<.45){cls[i]=2;if(i%7===0)s2.push(q[2])}}
    function med(a){if(!a.length)return .3;a.sort(function(u,v){return u-v});return a[a.length>>1]}
    return cache[key]={w:w,h:h,base:d,cls:cls,lum:lum,m1:med(s1),m2:med(s2)};
  }
  function paint(canvas,img,c1,c2){
    var P=prep(img);canvas.width=P.w;canvas.height=P.h;var x=canvas.getContext('2d');
    if(!c1){x.putImageData(P.base,0,0);return}
    var out=x.createImageData(P.w,P.h),o=out.data,b=P.base.data,A=hex(c1),B=hex(c2);
    for(var i=0,n=P.w*P.h;i<n;i++){var k=i*4,cl=P.cls[i];
      if(cl===0){o[k]=b[k];o[k+1]=b[k+1];o[k+2]=b[k+2];o[k+3]=b[k+3];continue}
      var col=cl===1?A:B,f=P.lum[i]/(cl===1?P.m1:P.m2);f=Math.max(.35,Math.min(f,1.9));
      var base=(col[0]+col[1]+col[2])/765, lift=base<.18?(f-1)*38:0;
      o[k]=Math.min(255,col[0]*f+lift);o[k+1]=Math.min(255,col[1]*f+lift);o[k+2]=Math.min(255,col[2]*f+lift);o[k+3]=b[k+3]}
    x.putImageData(out,0,0);
  }
  $$('[data-studio]').forEach(function(st){
    var cv=$('canvas',st),imgs={},cur={d:st.getAttribute('data-design')||'vortex',c1:st.getAttribute('data-c1')||'gold',c2:st.getAttribute('data-c2')||'black'};
    var nameEl=$('[data-name]',st),cta=$('[data-brief]',st);
    function load(d,cb){if(imgs[d]&&imgs[d].complete&&imgs[d].naturalWidth)return cb(imgs[d]);var im=new Image();im.onload=function(){imgs[d]=im;cb(im)};im.src='img/r-'+d+'.webp'}
    function draw(){load(cur.d,function(im){try{paint(cv,im,COLS[cur.c1][0],COLS[cur.c2][0]);cv.parentNode.classList.add('ready')}catch(e){}});
      if(nameEl)nameEl.textContent=DESIGNS[cur.d]+' in '+COLS[cur.c1][1].toLowerCase()+' and '+COLS[cur.c2][1].toLowerCase();
      if(cta)cta.href='start.html?design='+cur.d+'&c1='+cur.c1+'&c2='+cur.c2;
      $$('[data-c1v]',st).forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-c1v')===cur.c1?'true':'false')});
      $$('[data-c2v]',st).forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-c2v')===cur.c2?'true':'false')});
      $$('[data-dv]',st).forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-dv')===cur.d?'true':'false')});
    }
    st.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||!st.contains(b))return;
      if(b.hasAttribute('data-c1v'))cur.c1=b.getAttribute('data-c1v');
      else if(b.hasAttribute('data-c2v'))cur.c2=b.getAttribute('data-c2v');
      else if(b.hasAttribute('data-dv'))cur.d=b.getAttribute('data-dv');else return;draw()});
    draw();
  });

  /* door kits recolour themselves through club colourways */
  $$('canvas[data-cycle]').forEach(function(cv){var list=cv.getAttribute('data-cycle').split(',').map(function(x){return x.split(':')}),i=0,imgs={};
    function show(){var it=list[i%list.length];var im=imgs[it[0]];
      function go(im){try{paint(cv,im,COLS[it[1]][0],COLS[it[2]][0]);cv.classList.add('on')}catch(e){}}
      if(im&&im.complete)go(im);else{im=new Image();im.onload=function(){imgs[it[0]]=im;go(im)};im.src='img/r-'+it[0]+'.webp'}}
    show();if(RM)return;
    setInterval(function(){cv.classList.remove('on');setTimeout(function(){i++;show()},260)},2600)});

  /* video. plays only when on screen and only without reduced motion */
  var vids=$$('video[data-auto]');
  function vcheck(){vids.forEach(function(v){if(v.dataset.paused==='1')return;var r=v.getBoundingClientRect(),vis=r.bottom>0&&r.top<innerHeight;
    if(vis&&!RM&&!v.closest('.story-stage')){if(v.paused)v.play().catch(function(){})}else if(!v.closest('.story-stage')&&!v.paused)v.pause()})}
  if(vids.length){addEventListener('scroll',function(){requestAnimationFrame(vcheck)},{passive:true});addEventListener('load',vcheck);vcheck()}
  var vc=$('.vctl');
  if(vc){var hv=$('.vhero video');function setc(){var pz=hv.paused;vc.setAttribute('aria-label',pz?'Play the video':'Pause the video');vc.innerHTML=pz?'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9.5-5.5z" fill="currentColor"/></svg>':'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>'}
    vc.addEventListener('click',function(){if(hv.paused){hv.dataset.paused='';hv.play().catch(function(){})}else{hv.dataset.paused='1';hv.pause()}setc()});
    hv.addEventListener('play',setc);hv.addEventListener('pause',setc);setc()}

  /* the story. the beat nearest the middle of the screen picks the film */
  $$('.story').forEach(function(st){var vs=$$('.story-stage video',st),bs=$$('.beat',st),dots=$$('.story-count i',st),cur=-1;
    function pick(){var mid=innerHeight/2,best=0,bd=1e9;bs.forEach(function(b,i){var r=b.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-mid);if(d<bd){bd=d;best=i}});
      var sr=st.getBoundingClientRect(),inside=sr.top<innerHeight&&sr.bottom>0;
      if(best!==cur){cur=best;vs.forEach(function(v,i){v.classList.toggle('on',i===best)});dots.forEach(function(d,i){d.classList.toggle('on',i===best)})}
      vs.forEach(function(v,i){if(i===cur&&inside&&!RM){if(v.paused)v.play().catch(function(){})}else if(!v.paused)v.pause()})}
    addEventListener('scroll',function(){requestAnimationFrame(pick)},{passive:true});addEventListener('resize',pick);pick()});

  /* multi step forms */
  var EM=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function check(pane){var ok=true;
    $$('[data-req]',pane).forEach(function(f){var wrap=f.closest('.fld'),v='',t=f.getAttribute('data-req');
      if(f.type==='radio'||f.type==='checkbox'){v=$$('input[name="'+f.name+'"]:checked',pane).length?'x':''}else v=f.value.trim();
      var bad=!v||(t==='email'&&!EM.test(v))||(t==='min20'&&v.length<20);
      if(wrap)wrap.classList.toggle('bad',bad);if(bad)ok=false});
    var first=$('.fld.bad input, .fld.bad select, .fld.bad textarea',pane);if(first)first.focus();return ok}
  $$('form[data-steps]').forEach(function(fm){
    var panes=$$('.pane',fm),pr=$$('.prog div',fm),i=0,done=$('.done-box',fm.parentNode);
    function show(n){panes.forEach(function(p,k){p.hidden=k!==n});pr.forEach(function(d,k){d.className=k<n?'done':(k===n?'on':'')});i=n;
      var h=$('h3, legend, .fld label',panes[n]);}
    fm.addEventListener('click',function(e){var b=e.target.closest('[data-next],[data-back]');if(!b)return;e.preventDefault();
      if(b.hasAttribute('data-back')){show(Math.max(0,i-1));return}
      if(check(panes[i]))show(Math.min(panes.length-1,i+1))});
    fm.addEventListener('input',function(e){var w=e.target.closest('.fld');if(w&&w.classList.contains('bad'))w.classList.remove('bad')});
    fm.addEventListener('change',function(e){var w=e.target.closest('.fld');if(w&&w.classList.contains('bad'))w.classList.remove('bad')});
    fm.addEventListener('submit',function(e){e.preventDefault();if(!check(panes[i]))return;
      var nm=$('[name=name]',fm),out=$('[data-who]',done);if(out&&nm)out.textContent=nm.value.trim().split(' ')[0];
      fm.hidden=true;done.hidden=false;done.setAttribute('tabindex','-1');done.focus()});
    show(0);
  });

  /* brief prefill from the studio */
  var pk=$('[data-picked]');
  if(pk){var q=new URLSearchParams(location.search),d=q.get('design'),c1=q.get('c1'),c2=q.get('c2');
    if(d&&DESIGNS[d]&&COLS[c1]&&COLS[c2]){var cv=$('canvas',pk);pk.hidden=false;
      $('[data-pick-name]',pk).textContent=DESIGNS[d]+' in '+COLS[c1][1].toLowerCase()+' and '+COLS[c2][1].toLowerCase();
      var hid=$('input[name=design]');if(hid)hid.value=DESIGNS[d]+', '+COLS[c1][1]+', '+COLS[c2][1];
      var im=new Image();im.onload=function(){try{paint(cv,im,COLS[c1][0],COLS[c2][0])}catch(e){}};im.src='img/r-'+d+'.webp'}}

  /* package from brand design cards */
  $$('[data-pkg]').forEach(function(a){a.addEventListener('click',function(){var v=a.getAttribute('data-pkg'),r=$('input[name=package][value="'+v+'"]');if(r)r.checked=true})});
})();
