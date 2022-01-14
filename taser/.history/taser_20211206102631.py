from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(0,700,700,800))



image.save('sc.png')