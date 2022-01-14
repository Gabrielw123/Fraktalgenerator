from PIL import Image
import pytesseract
import time

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.tesseract_cmd = path_to_tesseract

def main():
    time.sleep(2)
    #Ta bild
    image = Image.grab(bbox=(0,1000,200,1080))
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

if __name__ == "__main__":
    main()
