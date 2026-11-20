import {cp,rm,mkdir} from 'node:fs/promises';
const out='dist';
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
for(const path of ['index.html','_redirects','assets','src']) await cp(path,`${out}/${path}`,{recursive:true});
// The deploy contains optimized derivatives; the ZIP source retains archival originals.
await rm(`${out}/assets/source`,{recursive:true,force:true});
await rm(`${out}/assets/originals`,{recursive:true,force:true});
console.log('CPS SPORTS production build created in dist/');
