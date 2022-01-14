from PIL import ImageGrab
from pytesseract import pytesseract
from PIL import Image
import time

time.sleep(10)
#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"

def main():
    
    #Ta bild
    image = ImageGrab.grab(bbox=(0,1000,200,1080))
    #spara bild
    image.save('sc.png')
    img = Image.open(image_path)

    pytesseract.tesseract_cmd = path_to_tesseract

    text = pytesseract.image_to_string(img)

    print(text[:-1])


if __name__ == "__main__":
    main()