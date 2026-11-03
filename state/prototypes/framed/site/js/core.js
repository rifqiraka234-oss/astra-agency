// shared by every page. The one state carried through the sketch lives here.
(function(){
  var S={get:function(k,d){try{var v=localStorage.getItem('framed.'+k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){try{localStorage.setItem('framed.'+k,JSON.stringify(v))}catch(e){}}};
  var C=window.FramedCore={store:S};
  C.settings=function(){var d={pw:20,rb:25,booths:1,li:10.5,em:3.4,emOn:false,price:299,extras:0,setup:500,tools:0,start:'2026-11-16'};var s=S.get('settings',{});for(var k in s)d[k]=s[k];return d};
  C.saveSettings=function(o){var s=S.get('settings',{});for(var k in o)s[k]=o[k];S.set('settings',s)};
  // Kian's full message, his opener plus his own close, from his site ("vraag je datum op tijd aan, zeker voor events in december")
  C.compose=function(l){var e=S.get('edits',{});if(e[l.id])return e[l.id];
    return l.opener+' Zal ik kijken of jullie datum nog vrij is? December loopt snel vol.\n\nGroet,\nKian\nFramed Photobooths';};
  C.composeEn=function(l){return l.openerEn+' Shall I check whether your date is still free? December fills up fast.\n\nBest,\nKian\nFramed Photobooths'};
  // the sum, one place, used by home, desk and returns
  C.weeks=function(st){var a=new Date(st.start||'2026-11-16'),end=new Date('2026-12-14'),n=0;for(var d=new Date(a);d<=end;d.setDate(d.getDate()+7))n++;return Math.max(1,n)};
  C.calc=function(st){var w=C.weeks(st),co=st.pw*w;var pReply=1-(1-st.li/100)*(1-(st.emOn?st.em/100:0));
    var rp=co*pReply,bk=rp*st.rb/100;var rev=bk*(st.price+(+st.extras||0));return {weeks:w,companies:co,replies:rp,bookings:bk,revenue:rev}};
  // nights from Mon 9 Nov to Sun 3 Jan, fill order Fri and Sat in December first
  C.nights=function(){var out=[],d=new Date('2026-11-09T12:00:00');for(var i=0;i<56;i++){out.push(new Date(d));d.setDate(d.getDate()+1)}return out};
  C.fillOrder=function(ns){var key=function(d){var m=d.getMonth(),dd=d.getDate(),w=d.getDay();var dec=m===11&&dd<=20,we=w===5||w===6,thu=w===4;
      return (dec&&we?0:we&&m===10&&dd>=20?1:dec&&thu?2:we?3:thu?4:9)*100+(m===11?dd:dd-40)};
    return ns.map(function(d,i){return {i:i,k:key(d)}}).filter(function(x){return x.k<900}).sort(function(a,b){return a.k-b.k}).map(function(x){return x.i})};
  C.iso=function(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
  C.dayname=function(d){return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]};
  C.mon=function(d){return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]};
  C.eur=function(n){return '€'+Math.round(n).toLocaleString('en-GB')};
  C.esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  // header turns solid once you scroll
  var bar=document.querySelector('.bar');if(bar){var f=function(){bar.classList.toggle('solid',scrollY>40)};f();addEventListener('scroll',f,{passive:true})}
})();
