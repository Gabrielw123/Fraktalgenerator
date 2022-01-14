from PIL import ImageGrab
image = ImageGrab.grab(bbox=(0,0,700,900))
image.save('sc.png')