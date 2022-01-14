from PIL import ImageGrab
from pytesseract import pytesseract
from PIL import Image
import time
import cv2
import numpy as np

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"

def taser():
    print("hej")

def main():
    while True:
        #Tabild
        image = ImageGrab.grab(bbox=(50,0,200,40))
        #spara bild
        image.save('sc.png')
        #visa bild
        img_np = np.array(image)
        frame = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
        pytesseract.tesseract_cmd = path_to_tesseract
        text = pytesseract.image_to_string(frame)
        cv2.imshow("frame", frame)
        if cv2.waitKey(1) & 0Xff == ord('q'):
            break
        
        print(text + "h")
        
        
    cv2.destroyAllWindows()
        


if __name__ == "__main__":
    main()
    