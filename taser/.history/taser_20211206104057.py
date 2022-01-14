from PIL import ImageGrab
import cv2
import pytesseract

#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))

image.save('sc.png')


img = cv2.imread('sc.png')

text = pytesseract.image_to_string(img)

print(text)

path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

img = Image.open('sc.png')

