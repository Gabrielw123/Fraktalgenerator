from PIL import ImageGrab


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))


from PIL import Image
import pytesseract

img = Image.open('number-7.jpg')

print(pytesseract.image_to_string(img, config='--psm 6'))

image.save('sc.png')