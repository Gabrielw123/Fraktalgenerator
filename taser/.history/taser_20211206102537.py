from PIL import ImageGrab
image = ImageGrab.grab(bbox=(0,0,700,1200))
image.save('sc.png')