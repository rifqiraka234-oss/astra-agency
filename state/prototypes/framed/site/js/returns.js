(function(){
  var C=window.FramedCore,st=C.settings();
  var q=function(s){return document.querySelector(s)};
  var fields=['pw','li','em','rb','extras','booths','setup','tools'];
  fields.forEach(function(k){var el=q('[data-in="'+k+'"]');if(el)el.value=st[k]});
  q('[data-in="emOn"]').checked=!!st.emOn;
  // nights one booth can do, Thursday to Saturday, 20 Nov to 20 Dec
  var cap1=C.nights().filter(function(d){var w=d.getDay(),iso=C.iso(d);return (w===4||w===5||w===6)&&iso>='2026-11-20'&&iso<='2026-12-20'}).length;
  var capNote=document.querySelectorAll('.src-note')[5];if(capNote)capNote.textContent='Caps the nights. One booth has '+cap1+' Thursday, Friday and Saturday nights from 20 November to 20 December.';
  var svg=q('[data-chart]'),NS='http://www.w3.org/2000/svg';
  var batches=['16 Nov','23 Nov','30 Nov','7 Dec','14 Dec'];
  function el(n,a,t){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;svg.appendChild(e);return e}
  function draw(){
    fields.forEach(function(k){var e=q('[data-in="'+k+'"]');if(e)st[k]=+e.value||0});st.emOn=q('[data-in="emOn"]').checked;C.saveSettings(st);
    q('[data-v="pw"]').textContent=st.pw;q('[data-v="li"]').textContent=st.li.toFixed(1)+'%';q('[data-v="em"]').textContent=st.em.toFixed(1)+'%';
    q('[data-v="em"]').parentNode.style.opacity=st.emOn?1:.45;q('[data-v="rb"]').textContent=st.rb+'%';q('[data-v="extras"]').textContent='€'+st.extras;q('[data-v="booths"]').textContent=st.booths;
    var p=1-(1-st.li/100)*(1-(st.emOn?st.em/100:0)),per=st.price+st.extras,cap=cap1*st.booths;
    var cum=batches.map(function(b,i){var co=st.pw*(i+1),rp=co*p,bk=Math.min(rp*st.rb/100,cap);return {co:co,rp:rp,bk:bk,eur:bk*per}});
    var last=cum[cum.length-1],cost=st.setup+st.tools*2,need=per?cost/per:0;
    while(svg.firstChild)svg.removeChild(svg.firstChild);
    var W=700,H=420,l=46,r=20,t=30,b=50,ymax=Math.max(4,last.bk,need,1)*1.25,bw=(W-l-r)/batches.length;
    var y=function(v){return H-b-(v/ymax)*(H-t-b)};
    for(var g=0;g<=4;g++){var v=ymax*g/4;el('line',{x1:l,x2:W-r,y1:y(v),y2:y(v),stroke:'rgba(201,184,168,.18)'});el('text',{x:l-10,y:y(v)+4,'text-anchor':'end',fill:'#c9b8a8','font-size':11,'font-family':'Fragment Mono,monospace'},v.toFixed(v<10?1:0))}
    cum.forEach(function(c,i){var x=l+i*bw+bw*.18,w=bw*.64,top=y(c.bk);
      el('rect',{x:x,y:top,width:w,height:Math.max(0,H-b-top),fill:'#f5f2ea'});
      el('rect',{x:x,y:top,width:w,height:4,fill:'#6b131f'});
      el('text',{x:x+w/2,y:top-10,'text-anchor':'middle',fill:'#f5f2ea','font-size':15,'font-family':'Gloock,serif'},C.eur(c.eur));
      el('text',{x:x+w/2,y:H-b+22,'text-anchor':'middle',fill:'#c9b8a8','font-size':11.5,'font-family':'Fragment Mono,monospace'},batches[i]);});
    if(cost>0){el('line',{x1:l,x2:W-r,y1:y(need),y2:y(need),stroke:'#d9c4ec','stroke-width':2,'stroke-dasharray':'6 6'});el('text',{x:l+6,y:y(need)-8,'text-anchor':'start',fill:'#d9c4ec','font-size':12,'font-family':'Fragment Mono,monospace'},'pays back '+C.eur(cost)+' at '+Math.ceil(need)+' nights')}
    el('text',{x:l,y:16,fill:'#c9b8a8','font-size':11.5,'font-family':'Fragment Mono,monospace'},'nights booked, adding up by Monday batch');
    q('[data-o="co"]').textContent=last.co;q('[data-o="rp"]').textContent=last.rp.toFixed(1);q('[data-o="bk"]').textContent=last.bk.toFixed(1);q('[data-o="eur"]').textContent=C.eur(last.eur);
    var msg='At '+st.pw+' companies a week for five Mondays, about '+last.rp.toFixed(0)+' reply and about '+last.bk.toFixed(1)+' book, worth '+C.eur(last.eur)+'.';
    if(cost>0)msg+=last.bk>=need?' That covers '+C.eur(cost)+' before Christmas.':' Covering '+C.eur(cost)+' takes '+Math.ceil(need)+' nights, so it pays back in the new year, or sooner with email on or more companies a week.';
    if(last.bk>=cap-.01)msg+=' Your booths are the limit now, not the companies.';
    q('[data-pay]').textContent=msg;
  }
  document.querySelectorAll('[data-in]').forEach(function(e){e.addEventListener('input',draw);e.addEventListener('change',draw)});
  // the chart is a control, drag up for more companies a week
  var drag=null;svg.addEventListener('pointerdown',function(e){drag={y:e.clientY,v:+q('[data-in="pw"]').value};svg.setPointerCapture(e.pointerId)});
  svg.addEventListener('pointermove',function(e){if(!drag)return;var v=Math.max(5,Math.min(40,Math.round(drag.v+(drag.y-e.clientY)/8)));q('[data-in="pw"]').value=v;draw()});
  ['pointerup','pointercancel'].forEach(function(n){svg.addEventListener(n,function(){drag=null})});
  // the market, from each supplier's own page, read 3 Nov 2026
  var M=[['Framed','€299, attendant included up to 6 hours, travel across NL',299,1],['Visualize Events','€299 for 3 hours plus €100 for an attendant',399],['Djunes, Friday or Saturday','€385 delivered in South Holland, no attendant',385],['Rotterdam listing, photobooths-huren.nl','€340 for 3 hours, no attendant',340],['PhotoBooth Experience','€329 for 5 hours, transport free to 20 km',329],['Djunes, weekday','€325 delivered in South Holland, no attendant',325]];
  q('[data-mk]').innerHTML=M.map(function(m){return '<div class="r'+(m[3]?' me':'')+'"><span>'+C.esc(m[0])+'<small>'+C.esc(m[1])+'</small></span><span class="t"><i style="width:'+(m[2]/420*100)+'%"></i></span><span>€'+m[2]+'</span></div>'}).join('');
  draw();
})();
