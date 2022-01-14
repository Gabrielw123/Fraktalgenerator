from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(0,900,1920,1080))



image.save('sc.png')