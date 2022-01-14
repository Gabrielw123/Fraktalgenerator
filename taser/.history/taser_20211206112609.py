from PIL import ImageGrab
from pytesseract import pytesseract
import tkinter as tk
from PIL import ImageTk, Image
import time
import cv2

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"


def main():
    while True:
        #Tabild
        image = ImageGrab.grab(bbox=(0,1000,200,1080))
        #spara bild
        image.save('sc.png')
        img = Image.open(image_path)
        pytesseract.tesseract_cmd = path_to_tesseract
        text = pytesseract.image_to_string(img)
        print(text)
        #visa bild
        cv2.imshow('img', cv2.imread('sc.png', 0))
        cv2.waitKey(1) 
        time.sleep(1)
        

if __name__ == "__main__":
    main()
    