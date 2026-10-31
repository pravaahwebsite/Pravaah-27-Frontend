import struct, os

def get_dims(filepath):
    with open(filepath, 'rb') as f:
        data = f.read()
    i = 0
    while i < len(data) - 9:
        if data[i] == 0xFF and data[i+1] in (0xC0, 0xC1, 0xC2):
            h, w = struct.unpack('>HH', data[i+5:i+9])
            return w, h
        i += 1
    return 0, 0

for f in sorted(os.listdir('assets/images/team')):
    if f.lower().endswith(('.jpg', '.jpeg', '.png')):
        p = os.path.join('assets/images/team', f)
        w, h = get_dims(p)
        ratio = round(w / h, 2) if h else 0
        print(f"{f}: {w}x{h} (ratio: {ratio})")
