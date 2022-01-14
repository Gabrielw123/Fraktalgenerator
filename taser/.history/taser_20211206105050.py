from PIL import ImageGrab
from PIL import Image
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

from PIL import Image
from pytesseract import pytesseract
  
# Defining paths to tesseract.exe 
# and the image we would be using
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"csv\d.jpg"
  
# Opening the image & storing it in an image object
img = Image.open(image_path)
  
# Providing the tesseract 
# executable location to pytesseract library
pytesseract.tesseract_cmd = path_to_tesseract
  
# Passing the image object to 
# image_to_string() function
# This function will
# extract the text from the image
text = pytesseract.image_to_string(img)
  
# Displaying the extracted text
print(text[:-1])