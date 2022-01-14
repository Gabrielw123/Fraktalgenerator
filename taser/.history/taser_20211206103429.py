from PIL import ImageGrab
import cv2


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))

image.save('sc.png')


img = cv2.imread('sc.png')

text = pytesseract.image_to_string(img)


import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'
print(pytesseract.image_to_string(r'sc.png'))

print(text)