from PIL import ImageGrab
from pytesseract import pytesseract
#setup

#Ta bild
image = ImageGrab.grab(bbox=(0,1000,200,1080))
#spara bild
image.save('sc.png')

#Ta bild

from PIL import Image

# Defining paths to tesseract.exe 
# and the image we would be using
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"
  
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