
(function(){
  function d2(n){return (n<10?'0':'')+n;}
  function fmt(d){
    var m=['januari','februari','maart','april','mei','juni','juli','augustus',
           'september','oktober','november','december'];
    return d.getDate()+' '+m[d.getMonth()];
  }
  function addWork(d,n){
    var x=new Date(d.getTime()),c=0;
    while(c<n){x.setDate(x.getDate()+1);var w=x.getDay();if(w!==0&&w!==6)c++;}
    return x;
  }
  // ---- treat date check, using the shop's own stated rules ----
  var dateIn=document.getElementById('tdate'),
      occIn=document.getElementById('tocc'),
      out=document.getElementById('verdict'),
      form=document.getElementById('finder');
  var today=new Date(); today.setHours(0,0,0,0);
  var min=new Date(today.getTime()); min.setDate(min.getDate()+1);
  if(dateIn){
    dateIn.min=min.getFullYear()+'-'+d2(min.getMonth()+1)+'-'+d2(min.getDate());
  }
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!dateIn.value){
        out.className='verdict tight on';
        out.innerHTML='Vul eerst de traktatiedatum in, dan rekenen we het voor je uit.';
        return;
      }
      var t=new Date(dateIn.value+'T00:00:00');
      var days=Math.round((t-today)/86400000);
      var ship=addWork(today,3);
      var cat=occIn.value;
      var link=cat?' <a href="https://toffetraktaties.nl/product-category/'+cat+'/" style="text-decoration:underline">Bekijk die traktaties</a>.':'';
      if(days>=12){
        out.className='verdict ok on';
        out.innerHTML='<b>Ruim op tijd.</b> We versturen je pakket rond '+fmt(addWork(t,-7))+
          ', ongeveer een week voor '+fmt(t)+'. Je kunt rustig kiezen.'+link;
      } else if(days>=6){
        out.className='verdict ok on';
        out.innerHTML='<b>Dat lukt.</b> Bestel je vandaag, dan gaat je pakket uiterlijk '+
          fmt(ship)+' op de post en is het ruim voor '+fmt(t)+' bij je.'+link;
      } else if(days>=3){
        out.className='verdict tight on';
        out.innerHTML='<b>Krap, maar vaak haalbaar.</b> We versturen binnen 3 werkdagen, dus '+
          'bestel vandaag nog. Twijfel je? App ons even op 06 21 25 66 61, dan kijken we mee.'+link;
      } else {
        out.className='verdict late on';
        out.innerHTML='<b>Dit is spoed.</b> Neem eerst even contact op via '+
          '<a href="https://wa.me/31621256661" style="text-decoration:underline">WhatsApp</a> of '+
          '<a href="mailto:info@toffetraktaties.nl" style="text-decoration:underline">mail</a>, '+
          'dan kijken we wat er nog kan.';
      }
    });
  }
  // ---- class size calculator ----
  var qty=document.getElementById('qty'), pick=document.getElementById('pick'),
      tot=document.getElementById('total'), bar=document.getElementById('bar'),
      note=document.getElementById('shipnote');
  function calc(){
    if(!qty||!pick) return;
    var n=Math.max(1,Math.min(200,parseInt(qty.value||'0',10)||0));
    var unit=parseFloat(pick.value);
    var t=n*unit;
    tot.textContent='€ '+t.toFixed(2).replace('.',',');
    var pct=Math.min(100,t/70*100);
    bar.style.width=pct+'%';
    if(t>=70){
      note.innerHTML='<b>Gratis verzending.</b> Je zit boven de € 70, wij betalen de verzendkosten.';
    } else {
      var left=(70-t);
      note.innerHTML='Nog <b>€ '+left.toFixed(2).replace('.',',')+
        '</b> tot gratis verzending. Daaronder is verzenden € 6,45 binnen Nederland.';
    }
  }
  if(qty){qty.addEventListener('input',calc);pick.addEventListener('change',calc);calc();}
})();
