// renders the top of the fix list page as the example image for part A
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1200,height:800},deviceScaleFactor:1.5});
 await p.goto('http://127.0.0.1:8794/fixes.html',{waitUntil:'networkidle'});
 await p.evaluate(()=>{document.querySelector('.bar').style.display='none';document.querySelector('.back').style.display='none';document.querySelector('.fixpage').style.paddingTop='56px';});
 await p.screenshot({path:'assets/img/ex/fixes.png',clip:{x:0,y:0,width:1200,height:800}});
 await b.close();
})();
