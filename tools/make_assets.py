from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import cv2
from pathlib import Path
P=Path(__file__).parent
S=Image.open('/mnt/data/a_high_detail_photorealistic_website_homepage_scr.png').convert('RGB')
hero=Image.open('/mnt/data/a_dramatic_cinematic_sports_scene_in_an_indoor_ba.png').convert('RGB')
hero.save(P/'hero-badminton.webp',format='WEBP',quality=91,method=6)
# Content crops from original artwork. Fully synthetic product imagery, no third-party trademarks.
items={
 'racket':((139,640,415,800),'dark'),
 'dumbbell':((464,640,754,800),'dark'),
 'basketball':((853,639,1050,803),'warm'),
 'football-boot':((1159,638,1440,803),'shoe'),
}
# Category strip packshots, 8 items
cats={
 'fitness':(127,438,241,520),'badminton':(317,448,406,519),'volleyball':(480,441,564,520),
 'tennis':(659,444,738,519),'table-tennis':(802,439,905,516),'football':(980,435,1065,518),
 'basketball-cat':(1148,436,1240,517),'accessories':(1310,435,1420,518),
}
def rgba_cut(crop,kind='dark'):
 a=np.array(crop).astype(np.float32)
 bgr=cv2.cvtColor(np.array(crop),cv2.COLOR_RGB2BGR)
 h,w=a.shape[:2]
 # Most generated product packshots are on near-neutral pale white studio backgrounds.
 bright=a.max(2); darkest=a.min(2); chroma=bright-darkest
 gray=a.mean(2)
 diff=np.sqrt(np.sum((255-a)**2,axis=2))
 if kind=='warm':
  strength=np.maximum(chroma*2.8,diff*.85)
 elif kind=='shoe':
  # Gray-blue seam details are kept; very-white edge disappears softly.
  strength=np.maximum((255-gray)*1.65,chroma*2.2)
 else:
  strength=np.maximum((255-gray)*1.55,chroma*1.7)
 alpha=np.clip((strength-50)/69,0,1)
 # preserve substance around darkest areas
 if kind=='warm':alpha=np.clip((strength-49)/58,0,1)
 # soften mask 0.3px to remove halos, avoiding airbrush effect
 alpha=cv2.GaussianBlur(alpha,(3,3),0.45)
 # background contamination removal near transparent edges
 rgb=a.copy()
 white=255
 rgb=np.clip((rgb-255*(1-alpha[...,None]))/np.maximum(alpha[...,None],.02),0,255)
 # Avoid strong contamination on light-colored objects
 rgb=np.where(alpha[...,None]>.35,rgb,a)
 rgba=np.dstack([rgb.astype('uint8'),(alpha*255).astype('uint8')])
 return Image.fromarray(rgba,'RGBA')
for k,(rect,kind) in items.items():
 im=rgba_cut(S.crop(rect),kind)
 # Remove corner stickers that belong to the page, not to the product.
 if k in ('racket','dumbbell'):
  from PIL import ImageDraw
  d=ImageDraw.Draw(im)
  if k=='racket': d.rectangle((0,0,12,33),fill=(0,0,0,0))
  if k=='dumbbell': d.rectangle((0,0,34,30),fill=(0,0,0,0))
 if k=='football-boot':
  from PIL import ImageDraw
  ImageDraw.Draw(im).rectangle((0,0,38,36),fill=(0,0,0,0))
 # place on generous centered transparent canvas, upsample for raster cleanliness
 W=900; H=720
 im.thumbnail((720,540),Image.Resampling.LANCZOS)
 im=im.resize((im.width*2,im.height*2),Image.Resampling.LANCZOS)
 canvas=Image.new('RGBA',(W,H))
 # fit to 860x640
 im.thumbnail((835,640),Image.Resampling.LANCZOS)
 canvas.alpha_composite(im,((W-im.width)//2,(H-im.height)//2))
 canvas.save(P/f'product-{k}.png',optimize=True)
for k,rect in cats.items():
 im=rgba_cut(S.crop(rect),'shoe' if k in ('badminton','accessories') else 'warm' if k in ('volleyball','tennis','table-tennis','basketball-cat') else 'dark')
 if k in ('football','volleyball','basketball-cat'):
  # Accurate opaque silhouette for balls with white patches, avoiding holes in the white leather.
  from PIL import ImageDraw,ImageFilter
  m=Image.new('L',im.size,0);d=ImageDraw.Draw(m)
  if k=='football':box=(10,4,82,78)
  elif k=='volleyball':box=(10,3,82,81)
  else:box=(12,5,79,82)
  d.ellipse(box,fill=255);m=m.filter(ImageFilter.GaussianBlur(.7));im.putalpha(m)
 im=im.resize((im.width*3,im.height*3),Image.Resampling.LANCZOS)
 canvas=Image.new('RGBA',(360,290))
 im.thumbnail((310,250),Image.Resampling.LANCZOS)
 canvas.alpha_composite(im,((360-im.width)//2,(290-im.height)//2))
 canvas.save(P/f'cat-{k}.png',optimize=True)
print('generated',len(list(P.glob('*.png'))),'PNG assets')
