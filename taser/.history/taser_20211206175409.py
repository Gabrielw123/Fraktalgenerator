from PIL import ImageGrab, Image
from pytesseract import pytesseract
import time, cv2, numpy as np

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"
#https://github.com/UB-Mannheim/tesseract/wiki

def taser():
    print("hello taser")

def main():
    health = 100
    while True:
        #Tabild
        image = ImageGrab.grab(bbox=(50,1040,150,1080))
        #spara bild
        image.save('sc.png')
        #visa bild
        img_np = np.array(image)
        frame = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
        pytesseract.tesseract_cmd = path_to_tesseract
        new_health = pytesseract.image_to_string(frame)
        new_health = new_health.strip('\n')
        new_health = new_health.strip('\t')
        
        try:
            new_health = int(new_health)
            if new_health < health:
                print(new_health)
                print(health)
                health = new_health
                print(health)
                taser()
        except:
            print("An exception occurred")
            
        cv2.imshow("frame", frame)
        if cv2.waitKey(25) & 0Xff == ord('q'):
            break
    cv2.destroyAllWindows()
        

if __name__ == "__main__":
    main()