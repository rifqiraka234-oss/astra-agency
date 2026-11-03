(function(){
  var C=window.FramedCore,S=C.store,st=C.settings(),L=window.FRAMED_LEADS||[];
  var q=function(s){return document.querySelector(s)};
  q('[data-f="booths"]').value=st.booths;q('[data-f="pw"]').value=st.pw;
  q('[data-f="booths-n"]').textContent='from Returns';q('[data-f="pw-n"]').textContent='from Returns';
  var saved=S.get('start',{});['goal','focus','busy','start'].forEach(function(k){if(saved[k]!=null)q('[data-f="'+k+'"]').value=saved[k]});
  function sum(){var k=S.get('kept',[]),b=S.get('booked',[]);var names=L.filter(function(l){return k.indexOf(l.id)>-1}).map(function(l){return l.name});
    var s={};['goal','focus','busy','start'].forEach(function(x){s[x]=q('[data-f="'+x+'"]').value});S.set('start',s);
    var bo=+q('[data-f="booths"]').value||1,pw=+q('[data-f="pw"]').value||20;C.saveSettings({booths:bo,pw:pw});
    var r=C.calc(C.settings());
    var t='Hi Raka, I went through the desk for Framed.\n\n'+
      'I can send out '+bo+' booth'+(bo>1?'s':'')+' and I\'d like about '+s.goal+' company events a month. Right now it\'s '+s.focus.toLowerCase()+'.\n'+
      'The desk can look for '+pw+' companies a week'+(st.emOn?', with email added':'')+'. My guess is '+st.rb+'% of replies book, which comes to about '+r.bookings.toFixed(1)+' nights by Christmas.\n'+
      (names.length?'I\'d keep these from the first batch, '+names.join(', ')+'.\n':'')+
      (s.busy?'Already busy in December, '+s.busy+'.\n':'')+
      '\nI\'d like to start '+(/^Monday/.test(s.start)?'on '+s.start:'after December, for spring')+'. What does it cost and when can we set it up?\n\nKian';
    q('[data-sum]').textContent=t;return t}
  document.querySelectorAll('[data-f]').forEach(function(e){e.addEventListener('input',sum);e.addEventListener('change',sum)});
  q('[data-copy]').addEventListener('click',function(){var t=sum();var done=function(){q('[data-copied]').textContent='Copied. Paste it into your LinkedIn chat with Raka.'};
    try{navigator.clipboard.writeText(t).then(done,function(){fallback()})}catch(e){fallback()}
    function fallback(){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){q('[data-copied]').textContent='Select the text above and copy it.'}a.remove()}});
  sum();
})();
