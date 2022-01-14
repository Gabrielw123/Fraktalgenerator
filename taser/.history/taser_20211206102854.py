from PIL import ImageGrab
import pytesseracts


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))





img = ImageGrab.open('sc.png')

print(pytesseract.image_to_string(img, config='--psm 6'))

image.save('sc1.png')