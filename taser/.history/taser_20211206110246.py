from PIL import ImageGrab
from pytesseract import pytesseract
import Tkinter as tk
from PIL import ImageTk, Image
import time

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"

path = 'sc.png'

root = tk.Tk()
img = ImageTk.PhotoImage(Image.open(path))
panel = tk.Label(root, image = img)
panel.pack(side = "bottom", fill = "both", expand = "yes")
root.mainloop()


def main():
    #Tabild
    image = ImageGrab.grab(bbox=(0,1000,200,1080))
    #spara bild
    image.save('sc.png')
    img = Image.open(image_path)

    pytesseract.tesseract_cmd = path_to_tesseract

    text = pytesseract.image_to_string(img)

    print(text[:-1])
    #visa bild
    im = Image.open(r"sc.png") 
    im.show() 
    time.sleep(1)


if __name__ == "__main__":
    main()