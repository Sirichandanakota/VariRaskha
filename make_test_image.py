from PIL import Image, ImageDraw

img = Image.new('RGB', (1200, 800), (255, 255, 255))
draw = ImageDraw.Draw(img)
draw.rectangle((0, 0, 1199, 799), fill=(248, 251, 247))

for i in range(0, 1200, 80):
    draw.ellipse((i, 250, i + 120, 520), fill=(18, 143, 90))

for x in [160, 360, 560, 760, 960]:
    draw.line((x, 220, x + 60, 700), fill=(8, 127, 78), width=18)

draw.line((0, 600, 1200, 600), fill=(184, 214, 191), width=90)
draw.line((50, 500, 1150, 500), fill=(9, 143, 90), width=12)
img.save('sample-rice.png')
print('created sample-rice.png')
