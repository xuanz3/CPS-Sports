import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {CATEGORIES,PRODUCTS,FEATURED_IDS,money,searchCatalog,getProduct} from '../src/data.js';

const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const handlers={},winHandlers={},storage=new Map;
const app={innerHTML:''};
const toast={innerHTML:'',classList:{add(){},remove(){}}};
const body={classList:{toggle(){}}};
globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
globalThis.location={pathname:'/',search:'',hash:'',origin:'http://localhost:4173'};
globalThis.history={pushState(_a,_b,url){setLocation(url)},replaceState(_a,_b,url){setLocation(url)}};
globalThis.document={getElementById(id){return id==='app'?app:id==='toast'?toast:null},addEventListener(type,handler){handlers[type]=handler},querySelector(){return null},querySelectorAll(){return []},body,hidden:false};
globalThis.window={matchMedia:()=>({matches:true}),scrollY:0,addEventListener(type,handler){winHandlers[type]=handler},scrollTo(){}};
globalThis.requestAnimationFrame=callback=>callback();
globalThis.FormData=class{constructor(form){this.fields=form.fields||{}}get(k){return this.fields[k]}};
function setLocation(url){const u=new URL(url,'http://localhost:4173');globalThis.location={pathname:u.pathname,search:u.search,hash:u.hash,origin:u.origin}}
await import('../src/app.js');
function route(url){setLocation(url);winHandlers.popstate()}
function click(action,data={}){handlers.click({target:{closest(selector){return selector==='[data-action]'?{dataset:{action,...data}}:null}},preventDefault(){},button:0})}
function submit(id,fields){handlers.submit({target:{id,fields,reportValidity(){return true}},preventDefault(){}})}

test('catalog uses exactly the user-supplied forty-one product images',()=>{
 assert.equal(CATEGORIES.length-1,8);
 assert.equal(PRODUCTS.length,41);
 assert.equal(new Set(PRODUCTS.map(p=>p.id)).size,41);
 assert.ok(PRODUCTS.every(p=>p.price>0&&p.stock>=0&&fs.existsSync(path.join(root,p.image.slice(1)))));
 assert.ok(PRODUCTS.every(p=>!p.image.includes('cat-')&&!p.image.includes('product-racket')));
 assert.equal(fs.readdirSync(path.join(root,'assets/products')).filter(x=>x.endsWith('.webp')&&!x.includes('-transparent')).length,41);
 assert.equal(money(125),'$125');
});
test('search and filters remain deterministic',()=>{
 assert.equal(searchCatalog('','badminton').length,6);
 assert.equal(searchCatalog('','fitness').length,7);
 assert.equal(searchCatalog('','accessories').length,7);
 assert.equal(searchCatalog('Nike').length,5);
 const ordered=searchCatalog('','all','price-low');assert.ok(ordered.every((p,i)=>!i||p.price>=ordered[i-1].price));
 assert.equal(getProduct('not-real'),undefined);
});
test('homepage is English with featured navigation, carousel and motion affordances',()=>{
 route('/');assert.match(app.innerHTML,/MAKE EVERY/);assert.match(app.innerHTML,/Discover/);
 assert.match(app.innerHTML,/Quick view/);assert.match(app.innerHTML,/Add to bag/);
 assert.match(app.innerHTML,/XUANZE CHEN/);assert.match(app.innerHTML,/hero-progress-item/);
 click('hero-next');assert.match(app.innerHTML,/FIND YOUR/);
 click('hero-prev');assert.match(app.innerHTML,/MAKE EVERY/);
});
test('product catalog supports search and encoded HTML is escaped',()=>{
 route('/sports/badminton');assert.match(app.innerHTML,/6 pieces to explore/);
 route('/shop?q=Mikasa');assert.match(app.innerHTML,/Mikasa/);
 route('/shop?q=%3Cscript%3E');assert.doesNotMatch(app.innerHTML,/<script>/);
 assert.match(app.innerHTML,/No matching equipment/);
});
test('detail shows only one supplied gallery image and supports quantity adjustments',()=>{
 route('/products/basketball-72897001_orange');assert.match(app.innerHTML,/React Basketball/);
 assert.match(app.innerHTML,/01 \/ 01/);assert.match(app.innerHTML,/Enlarge product photo/);
 click('detail-plus');assert.match(app.innerHTML,/>2<\/span>/);
 click('detail-minus');assert.match(app.innerHTML,/>1<\/span>/);
 click('zoom');assert.match(app.innerHTML,/zoom-modal/);click('close-zoom');assert.doesNotMatch(app.innerHTML,/zoom-modal/);
});
test('wishlist works persistently',()=>{
 route('/shop');click('favorite',{id:'badminton-63502401'});
 assert.match(storage.get('cps-sports-favorites'),/badminton-63502401/);
 route('/wishlist');assert.match(app.innerHTML,/Performance Badminton Racquet/);
 click('favorite',{id:'badminton-63502401'});assert.equal(storage.get('cps-sports-favorites'),'[]');
});
test('quick view and cart drawer behave correctly',()=>{
 route('/shop');click('quick',{id:'fitness-423989'});assert.match(app.innerHTML,/quick-modal/);
 click('close-modal');assert.doesNotMatch(app.innerHTML,/quick-modal/);
 click('add',{id:'fitness-423989'});assert.match(app.innerHTML,/drawer/);
 assert.match(storage.get('cps-sports-cart'),/fitness-423989/);
 click('close-drawer');route('/cart');assert.match(app.innerHTML,/\$89/);
 click('qty-plus',{id:'fitness-423989'});assert.match(app.innerHTML,/\$178/);
 click('qty-minus',{id:'fitness-423989'});assert.match(app.innerHTML,/\$89/);
});
test('checkout creates local preview orders without simulating a real transaction',()=>{
 route('/checkout');assert.match(app.innerHTML,/No payment is processed/);
 submit('checkout-form',{first:'Test',last:'Guest',email:'test@example.com',address:'1 Example St',city:'Melbourne',postcode:'3000'});
 assert.equal(location.pathname,'/order-success');assert.match(app.innerHTML,/No payment was taken/);
 assert.equal(storage.get('cps-sports-cart'),'[]');
 assert.match(storage.get('cps-sports-orders'),/CPS-PRE-/);
});
test('every public route renders complete English markup',()=>{
 for(const page of ['/','/shop','/sports/badminton','/sports/fitness','/sports/volleyball','/sports/tennis','/sports/table-tennis','/sports/football','/sports/basketball','/sports/accessories','/products/football-74162101_yellow','/cart','/wishlist','/account','/about','/journal','/support','/missing']){
  route(page);assert.ok(app.innerHTML.length>3000,page);assert.match(app.innerHTML,/<main id="main">/,page)
 }
});
test('no Chinese characters in the live storefront source or metadata',()=>{
 for(const file of ['index.html','src/app.js','src/data.js','src/styles.css','src/icons.js']){
  const content=fs.readFileSync(path.join(root,file),'utf8');assert.doesNotMatch(content,/\p{Script=Han}/u,`${file} contains CJK characters`)
 }
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8');assert.match(index,/lang="en-AU"/);assert.match(index,/Xuanze Chen/)
});
test('motion system has interactions and reduced-motion support',()=>{
 const css=fs.readFileSync(path.join(root,'src/styles.css'),'utf8');
 for(const feature of ['.product-card:hover','.wishlist-button:hover','.category-card:hover','.feature-panel:hover','.button::before','.drawer','.hero-progress-item','::view-transition-new(root)','prefers-reduced-motion:reduce'])assert.ok(css.includes(feature),feature);
});
