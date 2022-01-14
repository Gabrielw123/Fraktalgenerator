from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(100,0,700,800))



image.save('sc.png')