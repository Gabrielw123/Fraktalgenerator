from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,1920,1080))



image.save('sc.png')