/* Break test for the GTM Engine Check. node tests/check.js [runs per language and path]
   Walks every path in every language with random answers and hostile number inputs, intercepts the Netlify form
   posts, and fails on NaN, undefined, null, Infinity, an empty money figure, a dash or colon in visible text,
   a page error, a missing or empty submission, or a contact send that doesn't go out. Exit 0 pass, 1 fail. */
const {chromium,devices}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const dir=path.resolve(__dirname,'..'),RUNS=+process.argv[2]||6;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.woff2':'font/woff2','.jpg':'image/jpeg'};
const srv=http.createServer((q,r)=>{let f=path.join(dir,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});r.end(b)})});
const HOSTILE=['','0','abc','-5','99999999999','1.234,5','12,5','  7  ','1e6','€ 40.000'];
const bad=[];let runs=0,posts=0;
const rnd=n=>Math.floor(Math.random()*n);
(async()=>{await new Promise(r=>srv.listen(8799,r));const b=await chromium.launch();
for(const lang of ['en','nl','fr','de','it'])for(const pathName of ['team','me'])for(let k=0;k<RUNS;k++){
 const mobile=k%2===1;const ctx=await b.newContext(mobile?{...devices['iPhone 13']}:{viewport:{width:1440,height:900}});const p=await ctx.newPage();
 const errs=[],sent=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route('http://127.0.0.1:8799/',async(route,req)=>{if(req.method()==='POST'){sent.push(Object.fromEntries(new URLSearchParams(req.postData())));return route.fulfill({status:200,body:'ok'})}return route.continue()});
 await p.goto(`http://127.0.0.1:8799/?lang=${lang}`);await p.evaluate(()=>localStorage.clear());await p.goto(`http://127.0.0.1:8799/?lang=${lang}`);
 const tag=`${lang}/${pathName}/${k}${mobile?'/phone':''}`;
 const fail=m=>bad.push(`${tag} ${m}`);
 await p.click(`[data-path="${pathName}"]`);
 for(let step=0;step<40;step++){
  if(await p.$('.rep'))break;
  const body=await p.innerText('main');if(/NaN|undefined|Infinity|\bnull\b/.test(body))fail('bad token on question '+step+': '+body.match(/.{0,40}(NaN|undefined|Infinity|null).{0,20}/)[0]);
  const inputs=await p.$$('.field input');
  if(inputs.length){for(const el of inputs){const v=k===0?'':HOSTILE[rnd(HOSTILE.length)];await el.fill(k<2?await el.inputValue():v)}await p.click('#next');continue}
  const opts=await p.$$('.opt');
  if(await p.$('#next')){const n=rnd(opts.length+1);for(let j=0;j<n;j++){const o=await p.$$('.opt');await o[rnd(o.length)].click()}await p.click('#next');continue}
  if(!opts.length){fail('no options and no next at step '+step);break}
  await opts[rnd(opts.length)].click();await p.waitForTimeout(300);
 }
 if(!await p.$('.rep')){fail('never reached the report');await ctx.close();continue}
 await p.waitForTimeout(300);
 const txt=await p.innerText('main');
 if(/NaN|undefined|Infinity|\bnull\b/.test(txt))fail('bad token in report: '+txt.match(/.{0,50}(NaN|undefined|Infinity|null).{0,30}/)[0]);
 if(/[—–]/.test(txt))fail('dash in report');
 const colon=txt.split('\n').filter(l=>/[^0-9 ]:|: /.test(l)&&!/1:1|https?:/.test(l));if(colon.length)fail('colon in report: '+colon[0].slice(0,80));
 for(const kk of ['risk','opp','total']){const v=await p.$eval(`[data-k="${kk}"]`,e=>e.textContent).catch(()=>'');if(!/\d/.test(v))fail(`empty ${kk} figure "${v}"`)}
 const steps=await p.$$eval('.step .price',a=>a.map(e=>e.textContent));if(!steps.length||steps.some(s=>!s.trim()))fail('empty step price');
 await p.fill('#rec','70').catch(()=>{});await p.$eval('#rec',e=>{e.value='70';e.dispatchEvent(new Event('input'))});await p.waitForTimeout(150);
 if(/NaN|undefined/.test(await p.innerText('main')))fail('bad token after slider');
 /* the automatic send */
 const done=sent.filter(s=>s.kind==='completed');if(done.length!==1)fail(`expected 1 completed post, got ${done.length}`);
 else{const s=done[0];for(const f of ['form-name','lang','path','score','level','risk','opportunity','weakest','recommendation','total','answers','summary'])if(!s[f]||/NaN|undefined/.test(s[f]))fail(`completed post field ${f} = "${s[f]}"`);
  if(s.lang!==lang)fail('posted lang '+s.lang);if(isNaN(+s.score)||isNaN(+s.risk))fail('posted number not numeric');}
 /* the contact send, refused without consent, sent with it */
 await p.fill('#s_email','test@example.com');await p.click('#s_btn');await p.waitForTimeout(150);
 if(sent.some(s=>s.kind==='contact'))fail('contact sent without consent');
 await p.check('#s_consent');await p.fill('#s_name','Test Person');await p.click('#s_btn');await p.waitForTimeout(400);
 const c=sent.filter(s=>s.kind==='contact');if(c.length!==1||c[0].email!=='test@example.com'||c[0].consent!=='yes')fail('contact post wrong '+JSON.stringify(c.map(x=>x.email)));
 /* language switch on the report keeps the numbers and does not send again */
 const other=['en','nl','fr','de','it'].find(x=>x!==lang);await p.click(`[data-lang="${other}"]`);await p.waitForTimeout(200);
 if(sent.filter(s=>s.kind==='completed').length!==1)fail('language switch sent again');
 if(/NaN|undefined/.test(await p.innerText('main')))fail('bad token after language switch');
 /* phone scroll with a real touch swipe */
 if(mobile){const cdp=await ctx.newCDPSession(p);let moved=0;for(let tries=0;tries<2&&moved<100;tries++){await p.evaluate(()=>{document.activeElement&&document.activeElement.blur();scrollTo(0,0)});await p.waitForTimeout(250);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:560}]});for(let s=1;s<=12;s++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y:560-s*30}]});await p.waitForTimeout(16)}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(350);moved=await p.evaluate(()=>scrollY)}if(moved<100)fail('phone swipe did not scroll the report, twice');
  const wide=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(wide)fail('sideways scroll on phone')}
 if(errs.length)fail('page error '+errs[0]);
 posts+=sent.length;runs++;await ctx.close();
}
/* language detection from the browser */
for(const [loc,want] of [['de-DE','de'],['fr-BE','fr'],['nl','nl'],['it-IT','it'],['es-ES','en'],['en-GB','en']]){const ctx=await b.newContext({locale:loc});const p=await ctx.newPage();await p.goto('http://127.0.0.1:8799/');await p.evaluate(()=>localStorage.clear());await p.reload();const got=await p.evaluate(()=>document.documentElement.lang);if(got!==want)bad.push(`detect ${loc} gave ${got}, want ${want}`);await ctx.close()}
await b.close();srv.close();
console.log(`runs ${runs}, posts caught ${posts}, problems ${bad.length}`);bad.slice(0,40).forEach(x=>console.log(' FAIL',x));process.exit(bad.length?1:0)})();
