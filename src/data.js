/** CPS SPORTS catalog. All imagery derived exclusively from owner-provided Pics.zip.
 * Product names identify the visible items; prices are illustrative preview values.
 */
export const CATEGORIES = [
  {slug:'all',name:'All sports',eyebrow:'THE COMPLETE EDIT',tagline:'Explore the entire equipment edit.',image:'/assets/editorial/sports-balls.webp'},
  {slug:'badminton',name:'Badminton',eyebrow:'PRECISION / 01',tagline:'A faster game begins with the right equipment.',image:'/assets/products/badminton-63502401.webp'},
  {slug:'fitness',name:'Fitness',eyebrow:'STRENGTH / 02',tagline:'Built around the work you put in.',image:'/assets/products/fitness-423989.webp'},
  {slug:'volleyball',name:'Volleyball',eyebrow:'ELEVATION / 03',tagline:'Own the next point.',image:'/assets/products/volleyball-66937901.webp'},
  {slug:'tennis',name:'Tennis',eyebrow:'CONTROL / 04',tagline:'Find your edge on every court.',image:'/assets/products/tennis-70992901_blue.webp'},
  {slug:'table-tennis',name:'Table tennis',eyebrow:'REFLEX / 05',tagline:'Precision in the smallest margins.',image:'/assets/products/table-tennis-736848.webp'},
  {slug:'football',name:'Football',eyebrow:'MOMENTUM / 06',tagline:'A game made to move.',image:'/assets/products/football-74162101_yellow.webp'},
  {slug:'basketball',name:'Basketball',eyebrow:'ENERGY / 07',tagline:'Make the court yours.',image:'/assets/products/basketball-72897001_orange.webp'},
  {slug:'accessories',name:'Accessories',eyebrow:'THE DETAILS / 08',tagline:'The finishing touches for your session.',image:'/assets/products/football-73691701_black.webp'}
];
const item=(category,id,name,brand,price,flags='',alt='',tags=[])=>({
  id:`${category}-${id}`,slug:`${category}-${id}`,category,categories:[category,...tags],name,brand,price,
  image:`/assets/products/${category}-${id}.webp`,
  alt:alt||`${brand} ${name} product photograph`,
  badge:flags,stock:16,sku:id.split('_')[0],
  description:`A considered addition to your ${category.replace('-',' ')} setup. Explore the product photography and details before choosing your gear.`,
});
export const PRODUCTS=[
  item('badminton','63502401','Performance Badminton Racquet — Teal','Court Series',129,'NEW','Teal badminton racquet with white string bed'),
  item('badminton','70918001','Performance Badminton Racquet — Blue','Court Series',149,'','Blue badminton racquet with white string bed'),
  item('badminton','63502201','Performance Badminton Racquet — Red','Court Series',99,'','Red badminton racquet with white string bed'),
  item('badminton','53501201','Mavis 600 Shuttlecocks','Yonex',35,'POPULAR','Tube of Yonex Mavis 600 shuttlecocks'),
  item('badminton','63239501','Feather Shuttlecocks','Prince',24,'','Prince shuttlecock tube and shuttlecock'),
  item('badminton','53836301','Towel Grip Roll','Yonex',14,'','Yonex yellow towel grip roll in packaging',['accessories']),
  item('fitness','423989','Hex Dumbbell Pair — Black','Strength Edit',89,'BEST SELLER','Two black hex dumbbells with chrome grip'),
  item('fitness','423990','Hex Dumbbell — Compact','Strength Edit',49,'','Black hex dumbbell with chrome grip'),
  item('fitness','423993','Hex Dumbbell — Heavy','Strength Edit',109,'','Black hex dumbbells with textured ends'),
  item('fitness','423986','Neoprene Hex Dumbbell — Black','Strength Edit',25,'','Single black hex neoprene dumbbell'),
  item('fitness','420574','Neoprene Dumbbell — Yellow','Strength Edit',22,'','Yellow neoprene coated dumbbell'),
  item('fitness','420579','Neoprene Dumbbell — Blue','Strength Edit',22,'','Turquoise blue neoprene coated dumbbell'),
  item('fitness','420581','Neoprene Dumbbell — Red','Strength Edit',22,'','Red neoprene coated dumbbell'),
  item('volleyball','66937901','Beach Pro Volleyball','Mikasa',99,'POPULAR','White blue and yellow Mikasa beach volleyball'),
  item('volleyball','58004201','Indoor Match Volleyball','Mikasa',119,'NEW','Blue and yellow Mikasa indoor volleyball'),
  item('volleyball','67558101','Training Volleyball Pack','Mikasa',179,'','Mesh bag filled with Mikasa volleyballs'),
  item('volleyball','67557001','Volleyball Equipment Bag','Mikasa',89,'','Blue and yellow Mikasa volleyball bag',['accessories']),
  item('volleyball','56457501_black','Volleyball Knee Pads — Black','Nike',45,'','Black Nike knee pad',['accessories']),
  item('tennis','70992901_blue','Tour Tennis Racquet — Blue','Court Series',199,'NEW','Blue and white tennis racquet'),
  item('tennis','65259701_black','Control Tennis Racquet','Court Series',169,'','Black and yellow tennis racquet'),
  item('tennis','74262401_grey','Tour Tennis Racquet — Grey','Court Series',189,'','Grey and pink tennis racquet'),
  item('tennis','707544','Australian Open Tennis Balls','AO',19,'','Blue AO tennis ball tube with tennis ball'),
  item('tennis','72801701','Tennis Ball Water Bottle','AO',29,'','Tall blue and white tennis ball themed water bottle',['accessories']),
  item('table-tennis','736848','Classic Table Tennis Bat','Table Series',39,'POPULAR','Red table tennis paddle and wood handle'),
  item('table-tennis','736850','Control Table Tennis Bat','Table Series',45,'','Red table tennis bat with yellow detail'),
  item('table-tennis','736851','Competition Table Tennis Bat','Table Series',49,'','Red table tennis bat with pale wood handle'),
  item('table-tennis','597932','Training Table Tennis Balls','Table Series',29,'','Jar of orange table tennis balls'),
  item('table-tennis','714024','Foldable Table Tennis Table','Table Series',599,'','Full-sized folding ping pong table'),
  item('football','74162101_yellow','Match Football — Yellow','Puma',59,'NEW','Yellow and pink Puma football'),
  item('football','73691401_white','Match Football — White','Football Edit',45,'','White football with red and grey graphic'),
  item('football','73850001-01_orange','Speed Football Boots — Red','Football Edit',179,'','Red football boots with black detail'),
  item('football','74089801-01_orange','Speed Football Boots — Orange','Football Edit',189,'','Orange football boots with dark detailing'),
  item('football','73691701_black','Goalkeeper Gloves — Black','Nike',69,'','Black Nike goalkeeper gloves',['accessories']),
  item('football','73002101_blackwhite','Goalkeeper Gloves — White','Nike',65,'','White and black Nike goalkeeper gloves',['accessories']),
  item('basketball','72897001_orange','React Basketball','Spalding',59,'BEST SELLER','Orange Spalding React basketball'),
  item('basketball','56206301_orangeblack','Rebound Basketball','Spalding',49,'','Brown Spalding basketball'),
  item('basketball','74032401','Junior Hooper Basketball','Spalding',39,'','Colourful Spalding junior basketball'),
  item('basketball','70236301_red','Court Basketball Shoes — Red','Nike',189,'NEW','Red Nike basketball shoes'),
  item('basketball','71572501_blue','Court Basketball Shoes — Aqua','Nike',199,'','Aqua and yellow Nike basketball shoes'),
  item('basketball','561816','Portable Basketball Hoop','Basketball Edit',499,'','Black mobile basketball hoop and backboard'),
  item('basketball','74303301_red','Jumpman Graphic Tee — Red','Jordan',55,'','Red Jordan basketball T-shirt',['accessories'])
];
export const FEATURED_IDS = ['badminton-63502401','fitness-423989','basketball-72897001_orange','volleyball-66937901','tennis-70992901_blue','football-74162101_yellow','basketball-70236301_red','table-tennis-736848'];
export const getProduct=(slug)=>PRODUCTS.find(p=>p.slug===slug);
export const getCategory=(slug)=>CATEGORIES.find(c=>c.slug===slug);
export const money=(n)=>new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:2,minimumFractionDigits:0}).format(n);
export const searchCatalog=(query='',category='all',sort='featured',maxPrice=Infinity)=>{
 const q=query.trim().toLocaleLowerCase('en-AU');
 let filtered=PRODUCTS.filter(p=>(category==='all'||p.categories.includes(category))&&p.price<=maxPrice&&(!q||`${p.name} ${p.brand} ${p.category} ${p.sku}`.toLowerCase().includes(q)));
 if(sort==='price-low')filtered.sort((a,b)=>a.price-b.price);
 else if(sort==='price-high')filtered.sort((a,b)=>b.price-a.price);
 else if(sort==='name')filtered.sort((a,b)=>a.name.localeCompare(b.name));
 else filtered.sort((a,b)=>(FEATURED_IDS.includes(b.id)?1:0)-(FEATURED_IDS.includes(a.id)?1:0));
 return filtered;
};
