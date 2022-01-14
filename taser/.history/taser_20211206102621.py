from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,700,800))



image.save('sc.png')