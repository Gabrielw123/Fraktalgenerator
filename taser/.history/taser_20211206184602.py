from PIL import ImageGrab, Image
from pytesseract import pytesseract
import time, cv2, numpy as np

#setup
path_to_tesseract = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
image_path = r"sc.png"
pytesseract.tesseract_cmd = path_to_tesseract
#https://github.com/UB-Mannheim/tesseract/wiki

def taser():
    print("hello taser")

def main():
    health = 100
    while True:
        #Tabild
        image = ImageGrab.grab(bbox=(55,900,160,1070))
        #spara bild
        image.save('sc.png')
        #visa bild
        img_np = np.array(image)
        frame = cv2.cvtColor(img_np, cv2.COLOR_BGR2GRAY)
        new_health = pytesseract.image_to_string(image)
        print("h: " + new_health)
        new_health = new_health.strip('\n')
        new_health = new_health.strip('\t')
        
        try:
            new_health = int(new_health)
            if new_health <= health:
                print(new_health)
                print(health)
                print(health)
                if new_health < health:
                    taser()
                health = new_health
        except:
            print("")
            
        cv2.imshow("frame", frame)
        if cv2.waitKey(25) & 0Xff == ord('q'):
            break
    cv2.destroyAllWindows()
        

if __name__ == "__main__":
    main()