from PIL import Image
import os
import glob

image_dir = 'images'
png_files = glob.glob(os.path.join(image_dir, '*.png'))

for file in png_files:
    img = Image.open(file)
    webp_path = os.path.splitext(file)[0] + '.webp'
    img.save(webp_path, 'webp', quality=85)
    print(f"Converted {file} to {webp_path}")
