import {cp,rm,mkdir} from 'node:fs/promises';
const out = 'dist';
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
for(const name of ['index.html','_redirects','assets','src']) await cp(name,`${out}/${name}`,{recursive:true});
await rm(`${out}/assets/source`,{recursive:true,force:true});

console.log('Built static storefront in dist/');
