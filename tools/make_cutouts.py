"""Conservative white-background removal for high-contrast owner-supplied products.

Do not apply to white fabric, shuttlecock feather, racquet strings or other
low-contrast objects. Original photographs are never modified.
"""
from pathlib import Path
from PIL import Image
import numpy as np
from scipy.ndimage import gaussian_filter
ROOT=Path(__file__).resolve().parents[1]
FILES=['basketball-72897001_orange','basketball-56206301_orangeblack','fitness-423989','fitness-420574','football-74162101_yellow','table-tennis-736848','volleyball-58004201']
for name in FILES:
 im=Image.open(ROOT/'assets'/'products'/f'{name}.webp').convert('RGB')
 a=np.asarray(im,dtype=np.float32)
 # White studio background near neutral is transparent; textured product stays opaque.
 dark=255-a.min(axis=2)
 alpha=np.clip((dark-8.5)/19.5,0,1)
 # Keep colour-saturated and structurally dark surface fully opaque.
 sat=a.max(axis=2)-a.min(axis=2)
 alpha=np.maximum(alpha,np.clip((sat-14)/20,0,1))
 # Anti-alias edge conservatively; no resizing or super-resolution.
 rgba=np.dstack((a.astype('uint8'),(255*alpha).astype('uint8')))
 Image.fromarray(rgba,'RGBA').save(ROOT/'assets'/'products'/f'{name}-transparent.webp','WEBP',lossless=True,method=6)
 print(name)
