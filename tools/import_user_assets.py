"""Preserve user supplied originals and generate sharp WebP storefront derivatives.

Run: python3 tools/import_user_assets.py /path/to/Pics
All originals remain included so regenerated assets remain traceable.
"""
from __future__ import annotations
from pathlib import Path
import shutil,sys
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]
SRC=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'assets'/'originals'
if not SRC.exists(): raise SystemExit(f'Missing images: {SRC}')
SRC=SRC.resolve()
PRODUCT_DIRS={'Badminton':'badminton','Basketball':'basketball','Dumbell':'fitness','Pingpong':'table-tennis','Soccer':'football','Tennis':'tennis','Volleyball':'volleyball'}
count=0
for folder,category in PRODUCT_DIRS.items():
 for photo in sorted((SRC/folder).glob('*.jpg')):
  target=ROOT/'assets'/'originals'/folder/photo.name
  if photo.resolve()!=target.resolve():
   target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(photo,target)
  image=ImageOps.exif_transpose(Image.open(photo)).convert('RGB')
  # Keep the provided 1000x1000 original resolution; do not upscale or fabricate detail.
  path=ROOT/'assets'/'products'/f'{category}-{photo.stem.replace("Rebel_", "").replace("_hi-res", "")}.webp'
  image.save(path,'WEBP',quality=94,method=6)
  count+=1
for f in SRC.glob('*'):
 if f.suffix.lower() in {'.jpg','.png','.jpeg'}:
  target=ROOT/'assets'/'originals'/f.name
  if f.resolve()!=target.resolve(): shutil.copy2(f,target)
  im=ImageOps.exif_transpose(Image.open(f)).convert('RGB')
  im.save(ROOT/'assets'/'editorial'/(f.stem.replace('.jpg','')+'.webp'), 'WEBP',quality=92,method=6)
print(f'Imported {count} products; original files retained in assets/originals')
