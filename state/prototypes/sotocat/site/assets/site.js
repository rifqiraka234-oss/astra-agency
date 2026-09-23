(function(){
  "use strict";
  var doc=document.documentElement;
  doc.classList.remove("no-js");
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s,r){return (r||document).querySelector(s);}
  function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
  function gbp(n,dp){return "£"+Number(n).toLocaleString("en-GB",{minimumFractionDigits:dp||0,maximumFractionDigits:dp||0});}

  /* SotoCat's published price brackets, per unit per month, excluding VAT */
  var BRACKETS=[[1000,1.65],[700,1.80],[500,1.90],[400,2.10],[300,2.20],[200,2.30],[100,2.40],[1,2.50]];
  function unitPrice(u){for(var i=0;i<BRACKETS.length;i++){if(u>=BRACKETS[i][0])return BRACKETS[i][1];}return 2.50;}

  /* mobile menu */
  var mb=$(".menu-btn"),mn=$(".mnav");
  if(mb&&mn){mb.addEventListener("click",function(){var o=mn.classList.toggle("open");mb.setAttribute("aria-expanded",o?"true":"false");});
    $$("a",mn).forEach(function(a){a.addEventListener("click",function(){mn.classList.remove("open");mb.setAttribute("aria-expanded","false");});});}

  /* reveals */
  var rvs=$$(".rv,.h1,.pchart");
  if("IntersectionObserver" in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{rootMargin:"0px 0px -8% 0px",threshold:0.08});
    rvs.forEach(function(el){io.observe(el);});
  }else{rvs.forEach(function(el){el.classList.add("in");});}

  /* ---------- the live request ---------- */
  var demo=$("#demo");
  if(demo){
    var STEPS=[
      {chip:["c-new","New request"]},
      {chip:["c-est","Order estimation"]},
      {chip:["c-est","Order estimation"]},
      {chip:["c-quote","Quote submitted"]},
      {chip:["c-prog","In progress"]},
      {chip:["c-done","Resolved"]}
    ];
    var msgs=$$(".msg",demo),panes=$$(".pane",demo),rail=$$(".rail button",demo),chip=$(".tk-status",demo),typing=$(".typing",demo);
    var playBtn=$("#demo-play"),cur=-1,timers=[],playing=!reduce,visible=true,holdT=null;
    function clear(){timers.forEach(clearTimeout);timers=[];if(holdT){clearTimeout(holdT);holdT=null;}typing.classList.remove("on");}
    function setChip(k){chip.className="chip tk-status "+STEPS[k].chip[0];chip.innerHTML="<i></i>"+STEPS[k].chip[1];}
    function setRail(k){rail.forEach(function(b,i){b.classList.toggle("past",i<k);b.classList.toggle("cur",i===k);b.setAttribute("aria-current",i===k?"step":"false");var bar=b.querySelector(".bar i");bar.style.transition="none";bar.style.transform=i<k?"scaleX(1)":"scaleX(0)";});}
    function setPane(k){panes.forEach(function(p){p.classList.toggle("on",+p.dataset.pane===k);});}
    function render(k,animate){
      clear();cur=k;setChip(k);setRail(k);setPane(k);
      var mine=[];
      msgs.forEach(function(m){var a=+m.dataset.at;if(a<k){m.classList.add("on");m.classList.remove("hide");}else if(a===k){mine.push(m);}else{m.classList.remove("on");m.classList.add("hide");}});
      if(!animate){mine.forEach(function(m){m.classList.remove("hide");m.classList.add("on");});return;}
      var t=150;
      mine.forEach(function(m){
        var isS=m.classList.contains("s");
        if(isS){timers.push(setTimeout(function(){typing.classList.add("on");},t));t+=850;}
        (function(mm,tt){timers.push(setTimeout(function(){typing.classList.remove("on");mm.classList.remove("hide");requestAnimationFrame(function(){mm.classList.add("on");});},tt));})(m,t);
        t+=isS?1100:900;
      });
      var dur=Math.max(t+900,3400);
      var bar=rail[k].querySelector(".bar i");
      requestAnimationFrame(function(){requestAnimationFrame(function(){bar.style.transition="transform "+dur+"ms linear";bar.style.transform="scaleX(1)";});});
      timers.push(setTimeout(next,dur));
    }
    function next(){
      if(!playing||!visible)return;
      if(cur>=STEPS.length-1){holdT=setTimeout(function(){if(playing&&visible)render(0,true);},4200);return;}
      render(cur+1,true);
    }
    function setPlaying(p){playing=p;playBtn.setAttribute("aria-pressed",p?"false":"true");playBtn.querySelector("span").textContent=p?"Pause":"Play";playBtn.querySelector(".ic-pause").style.display=p?"":"none";playBtn.querySelector(".ic-play").style.display=p?"none":"";}
    playBtn.addEventListener("click",function(){if(playing){setPlaying(false);clear();var bar=rail[cur]&&rail[cur].querySelector(".bar i");if(bar){var w=getComputedStyle(bar).transform;bar.style.transition="none";bar.style.transform=w;}}else{setPlaying(true);render(cur>=STEPS.length-1?0:cur+1,true);}});
    $("#demo-replay").addEventListener("click",function(){setPlaying(true);render(0,true);});
    rail.forEach(function(b,i){b.addEventListener("click",function(){setPlaying(false);render(i,false);});});
    if(reduce){setPlaying(false);render(STEPS.length-1,false);}
    else{
      render(0,true);
      if("IntersectionObserver" in window){new IntersectionObserver(function(es){es.forEach(function(e){var was=visible;visible=e.isIntersecting;if(visible&&!was&&playing){render(cur>=STEPS.length-1?0:cur,true);}else if(!visible){clear();}});},{threshold:0.2}).observe(demo);}
    }
  }

  /* ---------- six chapters rail ---------- */
  var chaps=$$(".chap[id]"),links=$$(".srail a");
  if(chaps.length&&links.length&&"IntersectionObserver" in window){
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var id=e.target.id,hit=-1;links.forEach(function(a,i){if(a.getAttribute("href")==="#"+id)hit=i;});links.forEach(function(a,i){a.classList.toggle("on",i===hit);a.classList.toggle("past",i<hit);if(i===hit){a.setAttribute("aria-current","true");if(a.parentNode.scrollWidth>a.parentNode.clientWidth){a.parentNode.scrollTo({left:a.offsetLeft-20,behavior:reduce?"auto":"smooth"});}}else{a.removeAttribute("aria-current");}});}});},{rootMargin:"-40% 0px -55% 0px"});
    chaps.forEach(function(c){cio.observe(c);});
  }

  /* ---------- range fill ---------- */
  function fill(r){var p=(r.value-r.min)/(r.max-r.min)*100;r.style.setProperty("--p",p+"%");}
  $$("input[type=range]").forEach(function(r){fill(r);r.addEventListener("input",function(){fill(r);});});

  /* ---------- savings calculator ---------- */
  var calc=$("#calc");
  if(calc){
    var f={units:$("#c-units"),mgr:$("#c-mgr"),sal:$("#c-sal"),share:$("#c-share")};
    function run(){
      var u=+f.units.value,m=+f.mgr.value,s=+f.sal.value,sh=+f.share.value/100;
      var p=unitPrice(u),sub=u*p*12,staff=m*s*sh,hrs=m*40*sh,net=staff-sub;
      $("#o-units").textContent=u.toLocaleString("en-GB");
      $("#o-mgr").textContent=m;
      $("#o-sal").textContent=gbp(s);
      $("#o-share").textContent=Math.round(sh*100)+"%";
      $("#r-hrs").textContent=Math.round(hrs).toLocaleString("en-GB");
      $("#r-net").textContent=gbp(Math.abs(net));
      $("#r-net-l").textContent=net>=0?"a year back, after SotoCat's fee":"a year more than it saves, at these numbers";
      $("#r-staff").textContent=gbp(staff);
      $("#r-sub").textContent=gbp(sub);
      var mx=Math.max(staff,sub,1);
      $("#b-staff").style.width=(staff/mx*100)+"%";
      $("#b-sub").style.width=Math.max(1.5,sub/mx*100)+"%";
      $("#s-staff").textContent=m+" "+(m===1?"manager":"managers")+" × "+gbp(s)+" × "+Math.round(sh*100)+"% = "+gbp(staff)+" a year of repairs admin.";
      $("#s-sub").textContent=u.toLocaleString("en-GB")+" units × "+gbp(p,2)+" × 12 months = "+gbp(sub)+" a year for SotoCat, plus VAT.";
      $("#s-hrs").textContent=m+" × 40 hours × "+Math.round(sh*100)+"% = "+Math.round(hrs)+" hours a week.";
    }
    Object.keys(f).forEach(function(k){f[k].addEventListener("input",run);});
    run();
  }

  /* ---------- pricing page ---------- */
  var pin=$("#p-units");
  if(pin){
    var rows=$$(".ptable tbody tr");
    function price(){
      var u=Math.max(1,Math.min(100000,Math.round(+pin.value||0)));
      var p=unitPrice(u),mo=u*p;
      $("#p-month").textContent=gbp(mo,2);
      $("#p-per").textContent=gbp(p,2)+" a unit, "+u.toLocaleString("en-GB")+(u===1?" unit":" units");
      $("#p-year").textContent=gbp(mo*12,2);
      rows.forEach(function(r){var lo=+r.dataset.lo,hi=+r.dataset.hi;r.classList.toggle("hit",u>=lo&&u<=hi);});
    }
    pin.addEventListener("input",price);price();
  }

  /* ---------- forms ---------- */
  function validate(scope){
    var ok=true;
    $$("[required]",scope).forEach(function(el){
      var w=el.closest(".f")||el.parentNode,v=(el.type==="checkbox")?el.checked:String(el.value).trim();
      var bad=!v||(el.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value))||(el.type==="number"&&(+el.value<(+el.min||0)));
      w.classList.toggle("bad",!!bad);if(bad&&ok){ok=false;el.focus();}
    });
    return ok;
  }
  $$("form[data-simple]").forEach(function(fm){
    fm.addEventListener("submit",function(e){e.preventDefault();if(!validate(fm))return;var box=$("#"+fm.dataset.simple);var em=fm.querySelector("input[type=email]");var slot=box&&box.querySelector("[data-echo=email]");if(slot&&em)slot.textContent=em.value.trim();fm.hidden=true;if(box){box.classList.add("on");box.setAttribute("tabindex","-1");box.focus();}});
  });

  /* ---------- start trial, three steps ---------- */
  var st=$("#trial");
  if(st){
    var sets=$$(".fs",st),bars=$$(".steps span",st),note=$(".stepnote",st),k=0;
    var tu=$("#t-units");
    function tprice(){var u=Math.max(0,Math.round(+tu.value||0));var p=unitPrice(Math.max(1,u));$("#t-price").textContent=u?gbp(u*p,2):"£0.00";$("#t-per").textContent=u?(gbp(p,2)+" a unit after your 90 days, plus VAT"):"Enter your units to see the price";}
    tu.addEventListener("input",tprice);tprice();
    function show(i){k=i;sets.forEach(function(s,j){s.classList.toggle("on",j===i);});bars.forEach(function(b,j){b.classList.toggle("on",j<=i);});note.textContent="Step "+(i+1)+" of "+sets.length;var first=sets[i].querySelector("input,select");if(first)first.focus({preventScroll:true});}
    $$("[data-next]",st).forEach(function(b){b.addEventListener("click",function(){if(validate(sets[k]))show(k+1);});});
    $$("[data-back]",st).forEach(function(b){b.addEventListener("click",function(){show(k-1);});});
    st.addEventListener("submit",function(e){e.preventDefault();if(!validate(sets[k]))return;st.hidden=true;var box=$("#trial-ok");$("#ok-agency").textContent=$("#t-agency").value.trim();$("#ok-email").textContent=$("#t-email").value.trim();box.classList.add("on");box.setAttribute("tabindex","-1");box.focus();});
    show(0);
  }

  var y=$("#yr");if(y)y.textContent=new Date().getFullYear();
})();
