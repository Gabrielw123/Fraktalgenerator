from PIL import ImageGrab
from pytesseract import pytesseract
import tkinter as tk
from PIL import ImageTk, Image
import time

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"

root = tk()
root.geometry("550x300+300+150")
def open_img():
    x = openfn()
    img = Image.open(image_path)
    img = ImageTk.PhotoImage(img)
    panel = Label(root, image=img)
    panel.image = img
    panel.pack()
    
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
        command=open_img
        time.sleep(5)
    
root.mainloop()

if __name__ == "__main__":
    main()