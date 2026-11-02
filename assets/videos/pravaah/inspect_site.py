import re
import json

with open('website.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("Title:", re.findall(r'<title>(.*?)</title>', text, re.I))
print("Videos:", re.findall(r'<video[^>]*>', text, re.I))
print("Video sources:", re.findall(r'<source[^>]*src=["\']([^"\']+)["\']', text, re.I))
print("Video tag src:", re.findall(r'<video[^>]*src=["\']([^"\']+)["\']', text, re.I))

# Find any mp4, webm, mov, etc.
media = re.findall(r'["\']([^"\']*\.(?:mp4|webm|mov|ogg))["\']', text, re.I)
print("Media files:", set(media))

images = re.findall(r'["\']([^"\']*\.(?:png|jpg|jpeg|svg|webp|gif))["\']', text, re.I)
print("Images count:", len(images))
for img in sorted(set(images)):
    print("  Image:", img)

# Also check for links to external assets or next.js chunks
chunks = re.findall(r'src=["\']([^"\']*\.js)["\']', text, re.I)
print("JS chunks:", len(chunks))
for c in chunks[:10]:
    print("  JS:", c)
