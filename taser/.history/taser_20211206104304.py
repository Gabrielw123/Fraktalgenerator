from PIL import ImageGrab
import pytesseract

#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))

image.save('sc.png')


path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
img = ImageGrab.open('sc.png')
pytesseract.tesseract_cmd = path_to_tesseract
text = pytesseract.image_to_string(img)

print(text)