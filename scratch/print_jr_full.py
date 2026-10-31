import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:\Users\mahes\.gemini\antigravity\brain\d8c4d1eb-ef00-4bee-a50c-b98c66630887\scratch\srijan.js', 'r', encoding='utf-8') as f:
    js = f.read()

pos = 487989
# Print 6000 characters from pos
print(js[pos:pos+6000])

