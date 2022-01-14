from PIL import ImageGrab
import pytesseract

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.tesseract_cmd = path_to_tesseract

#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))

image.save('sc.png')

image_path = r"sc.png"

img = Image.open(image_path)


text = pytesseract.image_to_string(img)

print(text)