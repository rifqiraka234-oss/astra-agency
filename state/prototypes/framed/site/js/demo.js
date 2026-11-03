(function(){
  var C=window.FramedCore,S=C.store,esc=C.esc,L=window.FRAMED_LEADS||[];
  var q=function(s,r){return (r||document).querySelector(s)},qa=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var body=q('[data-pbody]');if(!body)return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wait=function(ms){return new Promise(function(r){setTimeout(r,reduce?0:ms)})};
  var step=0,kept=[],skipped=[],booked=null,busy=false;
  var TYPES={vacancy_office_events:'Job ads with events in them',hiring_wave:'Hiring waves and funding',funding:'Hiring waves and funding',jubileum:'Anniversaries',new_office:'New offices and openings',new_venue:'New offices and openings',student_association_lustrum:'Galas and drinks in an agenda',student_association_gala:'Galas and drinks in an agenda',kerstborrel_public:'Galas and drinks in an agenda'};
  function setTop(t,clock,tab){q('[data-ptitle]').textContent=t;q('[data-pclock]').textContent=clock;qa('[data-ptab]').forEach(function(s){s.classList.toggle('on',+s.dataset.ptab===tab)})}
  function role(r){return String(r||'').split(/ \(| or |\//)[0].trim()}

  function stepUI(n){if(innerWidth<900&&n>1&&step!==n){var pw=q('.phone-wrap');pw&&pw.scrollIntoView({block:'start'})}step=n;qa('.step').forEach(function(li){var k=+li.dataset.step;li.classList.toggle('on',k===n);li.classList.toggle('done',k<n)});arch(n)}

  // 1, the search
  async function s1(){if(busy)return;busy=true;stepUI(1);setTop('Sunday search','Sun 22.00',0);
    var groups={};L.forEach(function(l){var t=TYPES[l.signalType]||'Other';groups[t]=(groups[t]||0)+1});
    body.innerHTML='<h4>Looking for who\'s planning</h4><p class="sm">Public pages around the Randstad, from the last four months.</p><div data-lines style="margin-top:10px"></div><div class="printbar"><i></i></div><p class="mono" style="margin-top:8px" data-pmsg>searching</p>';
    var box=q('[data-lines]',body);
    for(var t in groups){box.insertAdjacentHTML('beforeend','<div class="src-line"><span>'+esc(t)+'</span><b>'+groups[t]+'</b></div>');await wait(60);box.lastElementChild.classList.add('in');await wait(420)}
    q('.printbar i',body).style.width='100%';q('[data-pmsg]',body).textContent='writing '+L.length+' messages in Dutch, printing your strips';await wait(1700);
    busy=false;s2()}
  // 2, keep or skip
  function s2(){stepUI(2);setTop('This week','Mon 08.30',0);
    body.innerHTML='<h4>'+L.length+' strips this week</h4><p class="sm" data-kc></p>'+L.map(function(l,i){return '<article class="mini drop" data-id="'+l.id+'" style="animation-delay:'+(i*70)+'ms"><button type="button" class="hd" data-open><span class="nm">'+esc(l.name)+'</span><span class="wn">'+esc(l.when)+'</span></button><p class="sg">'+esc(l.signal)+'</p><p class="msg" lang="nl">'+esc(C.compose(l))+'</p><div class="ks"><button type="button" class="k" data-k>Keep</button><button type="button" class="s" data-s>Skip</button></div></article>'}).join('');
    count()}
  function count(){var e=q('[data-kc]',body);if(e)e.textContent=kept.length?kept.length+' kept, they go out Tuesday':'Tap a name to read your message';qa('.mini',body).forEach(function(m){m.classList.toggle('kept',kept.indexOf(m.dataset.id)>-1);m.classList.toggle('skipped',skipped.indexOf(m.dataset.id)>-1);var k=q('[data-k]',m);if(k)k.textContent=kept.indexOf(m.dataset.id)>-1?'Kept':'Keep'})}
  body.addEventListener('click',function(e){var m=e.target.closest('.mini');
    if(m&&e.target.closest('[data-open]')){m.classList.toggle('open');return}
    if(m&&e.target.closest('[data-k]')){var id=m.dataset.id;skipped=skipped.filter(function(x){return x!==id});if(kept.indexOf(id)<0)kept.push(id);count();return}
    if(m&&e.target.closest('[data-s]')){var id2=m.dataset.id;kept=kept.filter(function(x){return x!==id2});if(skipped.indexOf(id2)<0)skipped.push(id2);count();return}
    var b=e.target.closest('[data-book]');if(b){book(b.dataset.book)}
  });
  // 3, out it goes
  async function s3(){if(busy)return;if(!kept.length)kept=L.slice(0,3).map(function(l){return l.id});busy=true;stepUI(3);setTop('Going out','Tue 09.00',0);
    var ks=L.filter(function(l){return kept.indexOf(l.id)>-1});var first=ks[0];
    var rows=[['Profile visit','Tue 09.10'],['Connection request','Tue 09.12'],['They accept','Wed'],['Your message','Thu 09.30']];
    body.innerHTML='<h4>'+ks.length+' going out as you</h4><p class="sm">From your LinkedIn, about 20 a day, office hours.</p>'+ks.map(function(l){return '<div class="seq"><p class="nm">'+esc(l.name)+'</p><p class="mono">to the '+esc(role(l.contactRole))+'</p><ol>'+rows.map(function(r){return '<li><span>'+r[0]+'</span><span class="d">'+r[1]+'</span></li>'}).join('')+'</ol></div>'}).join('')+
      '<p class="mono" style="margin-top:14px">How it lands in their inbox</p><div class="li-prev"><div class="who"><span class="av"></span><span><b>Kian Sattarian</b><br>Oprichter van Framed Photobooths</span></div><p class="bub" lang="nl">'+esc(C.compose(first))+'</p></div>';
    var lis=qa('.seq li',body);for(var i=0;i<4;i++){lis.forEach(function(li,j){if(j%4===i)li.classList.add('done')});await wait(500)}
    busy=false;}
  // 4, a reply, an example, dates from his free nights
  function freeNights(){var ns=C.nights(),order=C.fillOrder(ns);return order.map(function(i){return ns[i]}).filter(function(d){return !booked||C.iso(d)!==booked})}
  function nl(d){return ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'][d.getDay()]+' '+d.getDate()+' '+(d.getMonth()===11?'december':'november')}
  function s4(){stepUI(4);setTop('Replies','Fri 11.42',1);
    var want=new Date('2026-12-11T12:00:00'),alts=freeNights().filter(function(d){return C.iso(d)!=='2026-12-11'}).slice(0,2);
    body.innerHTML='<div class="notif"><b>New reply</b>Office manager, a Rotterdam company</div><div class="reply"><p class="mono">Example reply, written for this sketch</p><p class="in" lang="nl">Leuk! Ons kerstfeest is op vrijdag 11 december in Rotterdam, rond de 120 mensen. Kan dat nog?</p>'+
      '<p class="mono" style="margin-top:12px">Your answer, ready</p><p class="out" lang="nl">Hoi! Vrijdag 11 december is nog vrij, top. Voor 120 mensen werkt het prima, met onbeperkt prints en jullie logo op de strip, €299 all in. Via deze link staat alles al ingevuld, jullie datum staat vast zodra de aanbetaling van €100 binnen is.\nget-framed.com/boeken/?van=bedrijfsfeest\n\nGroet, Kian</p>'+
      '<div class="dates"><button type="button" data-book="2026-12-11">Send and book Fri 11 Dec</button>'+alts.map(function(d){return '<button type="button" data-book="'+C.iso(d)+'">Offer '+C.dayname(d)+' '+d.getDate()+' '+C.mon(d)+' instead</button>'}).join('')+'</div></div>';}
  function book(iso){booked=iso;s5()}
  // 5, December
  function s5(){stepUI(5);setTop('December','Fri 11.43',2);if(!booked)booked='2026-12-11';
    var ns=C.nights().filter(function(d){return C.iso(d)>='2026-11-30'&&C.iso(d)<='2027-01-03'}),bd=new Date(booked+'T12:00:00');
    body.innerHTML='<h4>Your December</h4><p class="sm">The night is yours, the next reply only gets offered what\'s free.</p><div class="mcal">'+['M','T','W','T','F','S','S'].map(function(d){return '<span class="h">'+d+'</span>'}).join('')+ns.map(function(d){var iso=C.iso(d),w=d.getDay();return '<span class="'+(iso===booked?'bk':'')+(w===5||w===6?' we':'')+(iso>'2026-12-31'?' x':'')+'">'+d.getDate()+'</span>'}).join('')+'</div>'+
      '<div class="bkd"><b>'+C.dayname(bd)+' '+bd.getDate()+' '+C.mon(bd)+'</b>Office manager, a Rotterdam company. €299 all in, €100 deposit through your booking form.</div>';}
  // 6, results
  function s6(){stepUI(6);setTop('Results','Sun 22.00',3);var st=C.settings(),k=kept.length||3;
    var rp=k*st.li/100;
    body.innerHTML='<h4>This week</h4><div class="res"><div><b>'+L.length+'</b><span>found Sunday</span></div><div><b>'+k+'</b><span>you kept</span></div><div><b>'+k+'</b><span>messages out</span></div><div><b>'+(booked?1:0)+'</b><span>night booked</span></div></div>'+
      '<p class="sm" style="margin-top:14px">At 10.5% on LinkedIn in the Netherlands, '+k+' messages bring about '+rp.toFixed(1)+' replies on average. The one above is an example, so you can see the flow.</p>'+
      (skipped.length?'<p class="sm" style="margin-top:10px">'+skipped.length+' skipped. Next Sunday the search leans away from them.</p>':'')+
      '<p class="mono" style="margin-top:14px">Next search, Sunday 22.00</p>';}

  var orig={};qa('[data-do]').forEach(function(b){orig[b.dataset.do]=b.textContent});
  qa('[data-do]').forEach(function(b){b.addEventListener('click',async function(){var n=+b.dataset.do;
    if(n===1)s1();
    if(n===2){if(!step||step<2)s2();kept=L.slice(0,3).map(function(l){return l.id});count();await wait(700);await s3();q('[data-do="3"]').textContent='A reply came in, open it'}
    if(n===3){if(step<3){await s3();b.textContent='A reply came in, open it'}else s4()}
    if(n===4){if(step<4){s4();b.textContent='Book Friday 11 December'}else book('2026-12-11')}})});
  qa('[data-next]').forEach(function(b){b.addEventListener('click',async function(){var n=+b.dataset.next;if(n===3){await s3();q('[data-do="3"]').textContent='A reply came in, open it'}if(n===6)s6()})});
  q('[data-restart]').addEventListener('click',function(){kept=[];skipped=[];booked=null;qa('[data-do]').forEach(function(b){b.textContent=orig[b.dataset.do]});document.getElementById('try').scrollIntoView({block:'start'});s1()});
  // waiting screen before step 1
  setTop('Desk','Sun 21.58',0);body.innerHTML='<h4>Sunday, 21.58</h4><p class="sm">Your desk is quiet. Press Run Sunday\'s search to start the week.</p><p class="mono" style="margin-top:16px">Nothing in this demo sends anything.</p>';stepUI(1);
  qa('.step').forEach(function(li){li.classList.toggle('on',li.dataset.step==='1');li.classList.remove('done')});

  // ===== how it connects
  var W=q('[data-wires]'),A=q('[data-arch]'),NS='http://www.w3.org/2000/svg';
  var EDGES=[['nA1','nA2','r'],['nA2','nA3','r'],['nA3','nA4','r'],['nA4','nA5','r'],['nA5','nB5','d'],['nB5','nB4','l'],['nB4','nB3','l'],['nB3','nB2','l'],['nB2','nB1','l'],['nB2','nA2','loop']];
  var STEP_LIT={1:['nA1','nA2'],2:['nA3'],3:['nA4','nA5'],4:['nB5','nB4','nB3','nB2'],5:['nB1'],6:[]};
  var STEP_EDGES={1:[0,1],2:[],3:[2,3],4:[4,5,6,7],5:[8],6:[9]};
  function pt(id,side){var r=q('#'+id).getBoundingClientRect(),a=A.getBoundingClientRect();var x=r.left-a.left,y=r.top-a.top;
    return side==='r'?[x+r.width,y+r.height/2]:side==='l'?[x,y+r.height/2]:side==='b'?[x+r.width/2,y+r.height]:side==='t'?[x+r.width/2,y]:[x+r.width/2,y+r.height/2]}
  var paths=[];
  function wires(){while(W.firstChild)W.removeChild(W.firstChild);paths=[];var stacked=innerWidth<900;
    EDGES.forEach(function(e,i){var d;
      if(stacked){if(e[2]==='loop'){paths.push(null);return}var a=pt(e[0],'b'),b=pt(e[1],'t');if(e[2]==='l'||e[2]==='d'){}d='M'+a[0]+','+a[1]+' L'+b[0]+','+b[1];
        // in a single column the bottom row reads upwards, draw from the lower node's top to the next one's bottom
        if(e[2]==='l'){a=pt(e[0],'t');b=pt(e[1],'b');d='M'+a[0]+','+a[1]+' L'+b[0]+','+b[1]}}
      else if(e[2]==='r'){var a1=pt(e[0],'r'),b1=pt(e[1],'l');d='M'+a1[0]+','+a1[1]+' L'+b1[0]+','+b1[1]}
      else if(e[2]==='l'){var a2=pt(e[0],'l'),b2=pt(e[1],'r');d='M'+a2[0]+','+a2[1]+' L'+b2[0]+','+b2[1]}
      else if(e[2]==='d'){var a3=pt(e[0],'b'),b3=pt(e[1],'t');d='M'+a3[0]+','+a3[1]+' L'+b3[0]+','+b3[1]}
      else{var a4=pt(e[0],'t'),b4=pt(e[1],'b');var my=(a4[1]+b4[1])/2;d='M'+a4[0]+','+a4[1]+' C'+a4[0]+','+my+' '+b4[0]+','+my+' '+b4[0]+','+b4[1]}
      var p=document.createElementNS(NS,'path');p.setAttribute('d',d);if(e[2]==='loop')p.setAttribute('stroke-dasharray','5 6');W.appendChild(p);paths.push(p)});
    arch(step)}
  function arch(n){if(!STEP_LIT||!paths)return;var lit={},le={};for(var k=1;k<=n;k++){(STEP_LIT[k]||[]).forEach(function(x){lit[x]=1});(STEP_EDGES[k]||[]).forEach(function(x){le[x]=1})}
    qa('.node').forEach(function(nd){nd.classList.toggle('lit',!!lit[nd.id])});paths.forEach(function(p,i){if(p)p.classList.toggle('lit',!!le[i])})}
  async function play(){var dot=document.createElementNS(NS,'circle');dot.setAttribute('r',6);W.appendChild(dot);
    for(var s=1;s<=6;s++){arch(s);var es=STEP_EDGES[s]||[];for(var i=0;i<es.length;i++){var p=paths[es[i]];if(!p)continue;var L2=p.getTotalLength(),t0=performance.now(),dur=reduce?1:650;
        await new Promise(function(res){(function f(t){var k=Math.min(1,(t-t0)/dur),P=p.getPointAtLength(L2*k);dot.setAttribute('cx',P.x);dot.setAttribute('cy',P.y);if(k<1)requestAnimationFrame(f);else res()})(t0)})}
      await wait(250)}
    dot.remove()}
  q('[data-play]').addEventListener('click',function(){qa('.node').forEach(function(nd){nd.classList.remove('lit')});paths.forEach(function(p){p&&p.classList.remove('lit')});play()});
  wires();addEventListener('resize',wires);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(wires);

  // ===== start, filled from what he did here
  var st=C.settings();var f=function(k){return q('[data-f="'+k+'"]')};
  f('booths').value=st.booths;f('pw').value=st.pw;
  function sum(){var s={};['goal','focus','busy','start'].forEach(function(x){s[x]=f(x).value});var bo=+f('booths').value||1,pw=+f('pw').value||20;C.saveSettings({booths:bo,pw:pw});
    var names=L.filter(function(l){return kept.indexOf(l.id)>-1}).map(function(l){return l.name});var r=C.calc(C.settings());
    var t='Hi Raka, I went through the desk for Framed.\n\nI can send out '+bo+' booth'+(bo>1?'s':'')+' and I\'d like about '+s.goal+' company events a month. Right now it\'s '+s.focus.toLowerCase()+'.\n'+
      'The desk can look for '+pw+' companies a week, which on your numbers comes to about '+r.bookings.toFixed(1)+' nights by Christmas.\n'+
      (names.length?'From the first batch I\'d keep '+names.join(', ')+'.\n':'')+(s.busy?'Already busy in December, '+s.busy+'.\n':'')+
      '\nI\'d like to start '+(/^Monday/.test(s.start)?'on '+s.start:'after December, for spring')+'. What does it cost and when can we set it up?\n\nKian';
    q('[data-sum]').textContent=t;return t}
  qa('[data-f]').forEach(function(e){e.addEventListener('input',sum);e.addEventListener('change',sum)});
  document.addEventListener('click',function(e){if(e.target.closest('[data-k],[data-s],[data-book],[data-do]'))setTimeout(sum,50)});
  q('[data-copy]').addEventListener('click',function(){var t=sum();var ok=function(){q('[data-copied]').textContent='Copied. Paste it into your LinkedIn chat with Raka.'};
    var fb=function(){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(x){q('[data-copied]').textContent='Select the text and copy it.'}a.remove()};
    try{navigator.clipboard.writeText(t).then(ok,fb)}catch(x){fb()}});
  sum();
})();
