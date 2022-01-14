from PIL import ImageGrab
from pytesseract import pytesseract
#setup

#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))
#spara bild
image.save('sc.png')

from PIL import Image


path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"

img = Image.open(image_path)

pytesseract.tesseract_cmd = path_to_tesseract

text = pytesseract.image_to_string(img)

print(text[:-1])