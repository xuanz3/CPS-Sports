import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {CATEGORIES,PRODUCTS,money} from '../src/data.js';

const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
const events={},windowEvents={},kv=new Map;
let app={innerHTML:''};let toast={textContent:'',classList:{add(){},remove(){}}};
globalThis.localStorage={getItem(k){return kv.get(k)||null},setItem(k,v){kv.set(k,v)}};
globalThis.location={pathname:'/',search:'',hash:''};
globalThis.history={pushState(_a,_b,url){const u=new URL(url,'https://cps.example');globalThis.location={pathname:u.pathname,search:u.search,hash:u.hash}}};
globalThis.document={getElementById(id){return id==='app'?app:toast},addEventListener(name,cb){events[name]=cb},querySelector(){return null}};
globalThis.window={innerWidth:1440,scrollY:0,addEventListener(name,cb){windowEvents[name]=cb},scrollTo(){}};
globalThis.scrollY=0;
globalThis.FormData=class {constructor(el){this.fields=el.fields||{}}get(k){return this.fields[k]}};
await import('../src/app.js');
function setRoute(url){const u=new URL(url,'https://cps.example');globalThis.location={pathname:u.pathname,search:u.search,hash:u.hash};windowEvents.popstate()}
function clickAction(action,data={}){events.click({target:{closest(sel){return sel==='[data-action]'?{dataset:{action,...data}}:null}},button:0,preventDefault(){}})}
function submit(id,fields){events.submit({target:{id,fields,reportValidity(){return true},reset(){}},preventDefault(){}})}

test('eight sport categories and valid seed catalog',()=>{
 assert.equal(CATEGORIES.length,8);assert.equal(PRODUCTS.length,24);
 assert.equal(new Set(PRODUCTS.map(x=>x.id)).size,PRODUCTS.length);
 assert.ok(PRODUCTS.every(x=>x.price>0&&x.stock>=0&&CATEGORIES.find(c=>c.slug===x.category)));
 assert.equal(money(1299),'¥1,299');
 for (const asset of [...PRODUCTS.map(p=>p.image),...CATEGORIES.map(c=>c.image),'/assets/hero-badminton.webp']) assert.ok(fs.existsSync(path.join(root,asset)),`Missing ${asset}`);
});
test('homepage renders hero, eight categories, featured products',()=>{
 setRoute('/');assert.match(app.innerHTML,/速度为刃/);assert.match(app.innerHTML,/羽毛球/);
 assert.match(app.innerHTML,/精选推荐/);assert.match(app.innerHTML,/加入购物车/)
});
test('sports catalog and keyword search',()=>{
 setRoute('/sports/badminton');assert.match(app.innerHTML,/羽毛球/);assert.match(app.innerHTML,/找到 3 件商品/);
 setRoute('/shop?q=篮球');assert.match(app.innerHTML,/搜索：篮球/);assert.match(app.innerHTML,/ELITE PRO/);
 setRoute('/shop?q=%3Cscript%3E');assert.doesNotMatch(app.innerHTML,/<script>/);assert.match(app.innerHTML,/没有找到符合条件的商品/)
});
test('product detail includes variant, specifications and purchase controls',()=>{
 setRoute('/products/aero-9000');assert.match(app.innerHTML,/AERO 9000/);
 assert.match(app.innerHTML,/碳纤维/);assert.match(app.innerHTML,/深海蓝/);assert.match(app.innerHTML,/加入购物车/)
});
test('wishlist persistence and clearing',()=>{
 setRoute('/shop');clickAction('wishlist',{id:'aero-9000'});assert.match(kv.get('cps-sports-wishlist'),/aero-9000/);
 setRoute('/wishlist');assert.match(app.innerHTML,/AERO 9000/);
 clickAction('wishlist',{id:'aero-9000'});assert.equal(kv.get('cps-sports-wishlist'),'[]')
});
test('add to cart, update quantity and display order summary',()=>{
 setRoute('/shop');clickAction('add',{id:'aero-9000'});assert.match(app.innerHTML,/cart-drawer/);
 assert.match(kv.get('cps-sports-cart'),/aero-9000/);
 clickAction('drawer-close');setRoute('/cart');assert.match(app.innerHTML,/¥1,299/);
 clickAction('cart-inc',{id:'aero-9000',color:'深海蓝'});assert.match(app.innerHTML,/¥2,598/);
 clickAction('cart-dec',{id:'aero-9000',color:'深海蓝'});assert.match(app.innerHTML,/¥1,299/)
});
test('checkout stores a local TEST order and clears cart',()=>{
 setRoute('/checkout');assert.match(app.innerHTML,/不会发起真实支付/);
 submit('checkout-form',{family:'测试',given:'用户',email:'person@example.com',phone:'13800000000',address:'Example Road',city:'上海',postcode:'200001',note:''});
 assert.equal(location.pathname,'/order-success');assert.match(app.innerHTML,/测试订单已创建/);
 assert.equal(kv.get('cps-sports-cart'),'[]');assert.match(kv.get('cps-sports-orders'),/CPS-T-/)
});
test('all public pages render without throwing',()=>{
 for (const route of ['/', '/shop','/sports/fitness','/sports/volleyball','/sports/tennis','/sports/table-tennis','/sports/football','/sports/basketball','/sports/accessories','/cart','/checkout','/wishlist','/account','/journal','/about','/support','/products/strength-40','/missing']){
  setRoute(route);assert.ok(app.innerHTML.length>300,route);assert.match(app.innerHTML,/<main/)
 }
});
