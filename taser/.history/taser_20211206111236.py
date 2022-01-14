from PIL import ImageGrab
from pytesseract import pytesseract
import tkinter as tk
from PIL import ImageTk, Image
import time

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"

from tkinter import *  
from PIL import ImageTk,Image  
root = Tk()  
canvas = Canvas(root, width = 300, height = 300)  
canvas.pack()  
img = ImageTk.PhotoImage(Image.open("sc.png"))  
canvas.create_image(20, 20, anchor=NW, image=img) 
root.mainloop()

def main():
    while True:
        #Tabild
        image = ImageGrab.grab(bbox=(0,1000,200,1080))
        #spara bild
        image.save('sc.png')
        img = Image.open(image_path)
        pytesseract.tesseract_cmd = path_to_tesseract
        text = pytesseract.image_to_string(img)
        print(text[:-1])
        #tkinter bild
        
        time.sleep(5)
    
root.mainloop()

if __name__ == "__main__":
    main()