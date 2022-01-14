from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))



image.save('sc.png')