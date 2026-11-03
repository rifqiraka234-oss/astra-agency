(function(){
  var C=window.FramedCore,S=C.store,esc=C.esc,L=window.FRAMED_LEADS||[],P=(window.FRAMED_PARTNERS||[]).map(function(p,i){
    var id='p'+i,nm=p.name.replace(/ \(.*\)$/,'');
    var known=/ss Rotterdam/i.test(p.name);
    var nl='Hoi, ik zag dat '+nm+' veel bedrijfsfeesten en kerstevents doet. Ik ben Kian van Framed, photobooth uit Rotterdam'+(known?', we stonden al eens bij jullie op de SS Rotterdam':'')+'. €299 all in met onbeperkt prints, en strip en startscherm in de huisstijl van jullie klant zonder extra kosten. Mag ik op jullie lijst met leveranciers? Dan regel ik alles rechtstreeks met de organisator.\n\nGroet,\nKian\nFramed Photobooths';
    var en='Hi, I saw '+nm+' runs a lot of company and Christmas events. I\'m Kian from Framed, a photobooth from Rotterdam'+(known?', we\'ve already stood with you on the SS Rotterdam':'')+'. €299 all in with unlimited prints, and the strip and start screen in your client\'s house style at no extra cost. Could I be on your supplier list? Then I sort everything directly with the organiser.\n\nBest,\nKian\nFramed Photobooths';
    return {id:id,name:nm,city:p.city,sector:p.sector,signal:p.signal,signalDate:p.signalDate,sourceUrl:p.sourceUrl,sourceQuote:p.sourceQuote,contactRole:p.contactRole,when:'Referrals',whenNote:'one partner, many parties',nl:nl,en:en,partner:true}});
  var all=L.concat(P);
  var get=function(k,d){return S.get(k,d)},set=function(k,v){S.set(k,v)};
  function role(r){return String(r||'').split(/ \(| or |\//)[0].trim()}
  function host(u){try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return u}}
  function fdate(s){if(!s)return'';var d=new Date(s+'T12:00:00');return d.getDate()+' '+C.mon(d)+' '+d.getFullYear()}
  function nl(l){return l.partner?(get('edits',{})[l.id]||l.nl):C.compose(l)}
  function en(l){return l.partner?l.en:C.composeEn(l)}

  // tabs, remembered
  var tabs=document.querySelectorAll('[data-tab]');
  function tab(t){tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.tab===t?'true':'false')});document.querySelectorAll('.pane').forEach(function(p){p.classList.toggle('on',p.id===t)});set('tab',t);if(t==='december')cal();if(t==='results')results();if(t==='replies')inbox();}
  tabs.forEach(function(b){b.addEventListener('click',function(){tab(b.dataset.tab)})});
  var startTab=(location.hash||'').slice(1)||get('tab','week');

  // This week
  var kind='lead',cur=null,list=document.querySelector('[data-list]'),det=document.querySelector('[data-detail]');
  function rows(){var k=get('kept',[]),s=get('skipped',[]);var items=all.filter(function(x){return kind==='partner'?x.partner:!x.partner});
    list.innerHTML=items.map(function(l){return '<button type="button" class="row-l'+(k.indexOf(l.id)>-1?' kept':'')+(s.indexOf(l.id)>-1?' skipped':'')+'" data-id="'+l.id+'"'+(cur===l.id?' aria-current="true"':'')+'><span class="tick"></span><span><span class="nm">'+esc(l.name)+'</span><span class="sg">'+esc(l.signal)+'</span></span><span class="wn">'+esc(l.when)+'</span></button>'}).join('');
    if(!cur||!items.some(function(x){return x.id===cur}))open(items[0].id);status();}
  function open(id){cur=id;var l=all.filter(function(x){return x.id===id})[0];var k=get('kept',[]),s=get('skipped',[]),why=get('why',{});
    list.querySelectorAll('.row-l').forEach(function(r){r.setAttribute('aria-current',r.dataset.id===id?'true':'false')});
    var future=l.signalDate>'2026-11-03';
    det.innerHTML='<div class="top"><div><h2>'+esc(l.name)+'</h2><p class="meta">'+esc(l.city)+', '+esc(l.sector)+(l.size?', '+esc(String(l.size).replace(/(\d)-(\d)/,'$1 to $2'))+(/member/.test(l.size)?'':' staff'):'')+'</p></div><p class="when">'+esc(l.when)+'<small>'+esc(l.whenNote)+'</small></p></div>'+
      '<div class="why"><strong>Why now.</strong> '+esc(l.signal)+'<q lang="nl">'+esc(l.sourceQuote)+'</q><a href="'+esc(l.sourceUrl)+'" target="_blank" rel="noopener">'+esc(host(l.sourceUrl))+', '+(future?'event on ':'')+esc(fdate(l.signalDate))+'</a></div>'+
      '<label class="lab" for="msg">Your message, in Dutch. Edit anything, it saves as you type.</label><textarea id="msg" lang="nl" data-msg>'+esc(nl(l))+'</textarea>'+
      '<p class="en">'+esc(en(l)).replace(/\n/g,'<br>')+'</p>'+
      '<p class="chan">Goes to the '+esc(role(l.contactRole))+', LinkedIn first, Tuesday from 09.00. One short bump three days later if they stay quiet.</p>'+
      '<div class="acts"><button class="btn wine" type="button" data-k>'+(k.indexOf(id)>-1?'Kept':'Keep')+'</button>'+
      '<select aria-label="Why skip" data-why><option value="">Skip because</option><option'+(why[id]==='too far'?' selected':'')+'>too far</option><option'+(why[id]==='too small'?' selected':'')+'>too small</option><option'+(why[id]==='not a party'?' selected':'')+'>not a party</option><option'+(why[id]==='know them already'?' selected':'')+'>know them already</option></select>'+
      '<span class="saved" data-saved>'+(s.indexOf(id)>-1?'skipped, '+esc(why[id]||''):'')+'</span></div>';
    det.querySelector('[data-k]').onclick=function(){var k=get('kept',[]).filter(function(x){return x!==id}),s=get('skipped',[]).filter(function(x){return x!==id});k.push(id);set('kept',k);set('skipped',s);rows();open(id)};
    det.querySelector('[data-why]').onchange=function(e){if(!e.target.value)return;var k=get('kept',[]).filter(function(x){return x!==id}),s=get('skipped',[]).filter(function(x){return x!==id});s.push(id);set('kept',k);set('skipped',s);var w=get('why',{});w[id]=e.target.value;set('why',w);rows();open(id)};
    det.querySelector('[data-msg]').oninput=function(e){var ed=get('edits',{});ed[id]=e.target.value;set('edits',ed);det.querySelector('[data-saved]').textContent='saved'};
    if(innerWidth<900&&document.activeElement&&document.activeElement.closest&&document.activeElement.closest('.row-l'))det.scrollIntoView({block:'start'});
  }
  list.addEventListener('click',function(e){var r=e.target.closest('.row-l');if(r)open(r.dataset.id)});
  document.querySelectorAll('[data-kind]').forEach(function(b){b.addEventListener('click',function(){kind=b.dataset.kind;document.querySelectorAll('[data-kind]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});cur=null;rows()})});
  function status(){var k=get('kept',[]);document.querySelector('[data-status]').textContent=k.length+' kept of '+all.length+', going out Tuesday 17 Nov from 09.00';document.querySelector('[data-n="week"]').textContent=all.length;var b=get('booked',[]);document.querySelector('[data-n="dec"]').textContent=b.length?b.length+' booked':'';document.querySelector('[data-n="replies"]').textContent='3'}

  // December, his nights
  var ns=C.nights();
  function free(){var b=get('booked',[]),bl=get('blocked',[]),taken={};b.forEach(function(x){taken[x.date]=1});bl.forEach(function(x){taken[x]=1});
    return C.fillOrder(ns).map(function(i){return ns[i]}).filter(function(d){return !taken[C.iso(d)]})}
  function cal(){var b=get('booked',[]),bl=get('blocked',[]),by={};b.forEach(function(x){by[x.date]=x});var el=document.querySelector('[data-cal]');
    el.innerHTML=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(function(d){return '<span class="dow">'+d+'</span>'}).join('')+ns.map(function(d){var iso=C.iso(d),w=d.getDay(),c='d'+(w===5||w===6?' we':'')+(by[iso]?' bk':'')+(bl.indexOf(iso)>-1?' bl':'');
      return '<button type="button" class="'+c+'" data-day="'+iso+'" aria-label="'+C.dayname(d)+' '+d.getDate()+' '+C.mon(d)+(by[iso]?', booked':bl.indexOf(iso)>-1?', busy':', free')+'"><span>'+d.getDate()+(d.getDate()===1||iso==='2026-11-09'?' '+C.mon(d):'')+'</span>'+(by[iso]?'<span class="who">'+esc(by[iso].who)+'</span>':'')+'</button>'}).join('');
    status()}
  document.querySelector('[data-cal]').addEventListener('click',function(e){var d=e.target.closest('[data-day]');if(!d)return;var iso=d.dataset.day,b=get('booked',[]);if(b.some(function(x){return x.date===iso}))return;var bl=get('blocked',[]);var i=bl.indexOf(iso);if(i>-1)bl.splice(i,1);else bl.push(iso);set('blocked',bl);cal()});

  // Replies, three examples
  var EX=[
    {id:'r1',tag:'Yes, with a date',frm:'Office manager, a Rotterdam company (example)',want:'2026-12-11',
     in:'Leuk! Ons kerstfeest is op vrijdag 11 december in Rotterdam, rond de 120 mensen. Kan dat nog?',inEn:'Nice! Our Christmas party is on Friday 11 December in Rotterdam, around 120 people. Is that still possible?',
     out:function(f){return 'Hoi! '+(f?'Vrijdag 11 december is nog vrij, top.':'Vrijdag 11 december is helaas al bezet, ik heb nog wel '+f2(3)+'.')+' Voor 120 mensen werkt het prima, met onbeperkt prints en jullie logo op de strip, €299 all in. Via deze link staat alles al ingevuld, jullie datum staat vast zodra de aanbetaling van €100 binnen is.\nget-framed.com/boeken/?van=bedrijfsfeest\n\nGroet, Kian'}},
    {id:'r2',tag:'A question',frm:'HR, a Delft company (example)',
     in:'Wat kost het met begeleiding? En kan ons logo op de strip?',inEn:'What does it cost with someone at the booth? And can our logo go on the strip?',
     out:function(){return 'Hoi! Met of zonder begeleiding kost hetzelfde, €299 all in. De strip en het startscherm maken we in jullie huisstijl, zonder extra kosten. Welke datum hadden jullie in gedachten? Ik heb nog vrij op '+f2(3)+'.\n\nGroet, Kian'}},
    {id:'r3',tag:'Not now',frm:'Committee, a study association (example)',
     in:'Dit jaar hebben we al iets geregeld, misschien volgend jaar.',inEn:'We already have something this year, maybe next year.',
     out:function(){return 'Helemaal goed, dank voor je reactie! Ik zet een herinnering voor september, dan stuur ik je op tijd een berichtje voor het volgende feest.\n\nGroet, Kian'}}];
  function f2(n){return free().slice(0,n).map(function(d){return ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'][d.getDay()]+' '+d.getDate()+' '+(d.getMonth()===11?'december':'november')}).join(', ').replace(/, ([^,]*)$/,' of $1')}
  function inbox(){var b=get('booked',[]),done=get('answered',{}),el=document.querySelector('[data-inbox]');
    el.innerHTML=EX.map(function(r){var mine=b.filter(function(x){return x.from===r.id})[0];var fr=free();
      var wantFree=r.want&&(fr.some(function(d){return C.iso(d)===r.want})||(mine&&mine.date===r.want));
      var opts=r.id==='r3'?[]:(r.want&&wantFree?[new Date(r.want+'T12:00:00')]:[]).concat(fr.filter(function(d){return C.iso(d)!==r.want}).slice(0,r.want&&wantFree?2:3));
      return '<article class="msg"><div class="in"><p class="tag">'+esc(r.tag)+'</p><p class="frm">'+esc(r.frm)+'</p><p class="txt" lang="nl">'+esc(r.in)+'</p><p class="example">'+esc(r.inEn)+'</p></div>'+
        '<div class="out"><p class="tag">Your answer, ready</p><p class="txt" lang="nl">'+esc(r.out(wantFree)).replace(/\n/g,'<br>')+'</p>'+
        (r.id==='r3'?'<div class="dates"><button type="button" data-remind="'+r.id+'" aria-pressed="'+(done[r.id]?'true':'false')+'">'+(done[r.id]?'Reminder set for September 2027':'Send and remind me in September')+'</button></div>':
        (mine?'<p class="done">Booked '+esc(mine.label)+', in your December.</p>':'<div class="dates">'+opts.map(function(d){return '<button type="button" data-book="'+r.id+'" data-date="'+C.iso(d)+'">Send and book '+C.dayname(d)+' '+d.getDate()+' '+C.mon(d)+'</button>'}).join('')+'</div>'))+
        '</div></article>'}).join('');}
  document.querySelector('[data-inbox]').addEventListener('click',function(e){var bt=e.target.closest('[data-book]');if(bt){var d=new Date(bt.dataset.date+'T12:00:00');var b=get('booked',[]);b.push({date:bt.dataset.date,from:bt.dataset.book,who:EX.filter(function(x){return x.id===bt.dataset.book})[0].frm.split(',')[1].replace('(example)','').trim(),label:C.dayname(d)+' '+d.getDate()+' '+C.mon(d)});set('booked',b);inbox();status();return}
    var rm=e.target.closest('[data-remind]');if(rm){var a=get('answered',{});a[rm.dataset.remind]=1;set('answered',a);inbox()}});

  // Results
  function results(){var st=C.settings(),k=get('kept',[]),b=get('booked',[]);var kl=k.length;var rp=kl*(1-(1-st.li/100)*(1-(st.emOn?st.em/100:0)));var bk=rp*st.rb/100;
    var pr=C.calc(st);document.querySelector('[data-funnel]').innerHTML=[[all.length,'found on Sunday'],[kl,'you kept this week'],[rp.toFixed(1),'replies expected from them'],[Math.round(pr.bookings*10)/10,'bookings by 14 Dec at '+st.pw+' a week'],[b.length,'booked from replies so far']].map(function(x){return '<div><span class="big">'+x[0]+'</span><span class="lab">'+x[1]+'</span></div>'}).join('');
    var types={};all.forEach(function(l){var t=l.partner?'venues and agencies':({vacancy_office_events:'job ads with events',hiring_wave:'hiring waves',jubileum:'anniversaries',new_office:'new offices',funding:'funding',student_association_lustrum:'student associations',student_association_gala:'student associations',kerstborrel_public:'Christmas drinks in an agenda',new_venue:'new venues'}[l.signalType]||'other');types[t]=types[t]||{n:0,k:0};types[t].n++;if(k.indexOf(l.id)>-1)types[t].k++});
    document.querySelector('[data-bars]').innerHTML='<p class="lab" style="color:var(--muted);margin-bottom:8px">What you kept, by the kind of reason</p>'+Object.keys(types).map(function(t){var v=types[t];return '<div class="b"><span>'+esc(t)+'</span><span class="t"><i style="width:'+(v.k/v.n*100)+'%"></i></span><span>'+v.k+' of '+v.n+'</span></div>'}).join('');
    var why=get('why',{}),c={};Object.keys(why).forEach(function(i){c[why[i]]=(c[why[i]]||0)+1});
    document.querySelector('[data-learn]').innerHTML=Object.keys(c).length?'<p><strong>What your skips teach next Sunday\'s search.</strong></p><ul>'+Object.keys(c).map(function(r){return '<li>'+c[r]+' skipped as '+esc(r)+(r==='too far'?', the search keeps closer to Rotterdam':r==='too small'?', the search raises the minimum team size':r==='not a party'?', that kind of reason gets less weight':', they go on a do not contact list')+'</li>'}).join('')+'</ul>':'<p>Skip something in This week and say why, and this is where you see what the search learns from it.</p>';
  }
  document.querySelectorAll('[data-jump]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();tab(a.dataset.jump);document.getElementById('app').scrollIntoView({block:'start'})})});
  rows();tab(['week','replies','december','results'].indexOf(startTab)>-1?startTab:'week');
})();
