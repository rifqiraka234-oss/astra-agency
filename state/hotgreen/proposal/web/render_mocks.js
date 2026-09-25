// node render_mocks.js [late] , renders each .shot in mocks/index.html (or late.html) to assets/img/ex/<id>.png
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const page=process.argv[2]==='late'?'late.html':'index.html';
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1240,height:900},deviceScaleFactor:1.5});
 const errs=[]; p.on('pageerror',e=>errs.push(String(e))); p.on('response',r=>{if(r.status()>=400)errs.push(r.status()+' '+r.url())});
 await p.goto('http://127.0.0.1:8793/mocks/'+page,{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready);
 const ids=await p.$$eval('.shot',s=>s.map(x=>x.id));
 for(const id of ids){ await p.locator('#'+id).screenshot({path:'assets/img/ex/'+id.slice(2)+'.png'}); }
 console.log('rendered',ids.length,'errors',JSON.stringify(errs));
 await b.close();
})();
