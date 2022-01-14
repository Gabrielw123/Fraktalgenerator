import PIL
from pytesseract import pytesseract
#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.tesseract_cmd = path_to_tesseract


#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))
#spara bild
image.save('sc.png')
#bild path
image_path = r"sc.png"
#öppna bild
img = Image.open(image_path)
#läsa bild
text = pytesseract.image_to_string(img)
#printa bild
print(text)

