//denna h�ller all information f�r bakgrunden och m�tten.
var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext("2d");
var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;
var mouseClicked = false, mouseReleased = true;
var  x0 = 50;
  y0 = 40;
  bredd =20;
  hojd = 20;
  distance = 40;
  color = "darkred";
  radie = 10;
  size = 22;
  fill = true;
//denna kollar om ritar.
document.addEventListener("click", onMouseClick, false);
document.addEventListener("mousemove", onMouseMove, false);
//om man ritar kollar denna funktion vart positionen �r.
function onMouseClick(e) {
    mouseClicked = !mouseClicked;
if (!mouseClicked) {
lastPos = null;
}
}
//den h�r funktionen kollar var den senaste cirkeln man ritade. vilken position.
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}
//denna funktion g�r s� att om du klickar f�r att rita s� b�rjar den ritandet d�r din muspekare �r. Johan 19b hj�lpte mig med denna funktion. Den g�r ocks� � att den drar en linje fr�n den sensate cirkeln.
function onMouseMove(e) {

    if (mouseClicked) {

    var pos = getMousePos(canvas, e);

    if (!lastPos) {
        lastPos = pos;
    }

    context.beginPath();

    context.moveTo(lastPos.x, lastPos.y)

    context.lineTo(pos.x, pos.y)

    context.lineWidth = radie;

    context.lineCap = "round";

    context.strokeStyle = color;
    context.stroke();

    context.fillStyle=color
    context.fill();

    lastPos = pos;
}
//en mouse over-funktion som �r att n�r du h�ller muspekaren �ver en f�rg �ndras din nuvarande f�rg till den du h�ller �ver. 
//Den h�ller i vilket omr�de man kan bytta f�rg och till vilken f�rg.
if ((e.clientX > x0 + 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 90)
        && (e.clientY < y0 + 5.5*hojd)) { color = "darkred"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 +90)
        && (e.clientY < y0 + 5.5*hojd)) { color = "red"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 +90)
        && (e.clientY < y0 + 5.5*hojd)) { color = "crimson"; }

if ((e.clientX > x0 + 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 130)
        && (e.clientY < y0 + 7.5*hojd)) { color = "darkOrange"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 + 130)
        && (e.clientY < y0 + 7.5*hojd)) { color = "orange"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 + 130)
        && (e.clientY < y0 + 7.5*hojd)) { color = "Khaki"; }


if ((e.clientX > x0 + 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 170)
        && (e.clientY < y0 + 9.5*hojd)) { color = "goldenrod"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 + 170)
        && (e.clientY < y0 + 9.5*hojd)) { color = "gold"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 + 170)
        && (e.clientY < y0 + 9.5*hojd)) { color = "yellow"; }

if ((e.clientX > x0+ 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 210)
        && (e.clientY < y0 + 11.5*hojd)) { color = "green"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 + 210)
        && (e.clientY < y0 + 11.5*hojd)) { color = "limegreen"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 + 210)
        && (e.clientY < y0 + 11.5*hojd)) { color = "lime"; }

if ((e.clientX > x0 + 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 250)
        && (e.clientY < y0 + 13.5*hojd)) { color = "navy"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 + 250)
        && (e.clientY < y0 + 13.5*hojd)) { color = "royalblue"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 + 250)
        && (e.clientY < y0 + 13.5*hojd)) { color = "blue"; }

if ((e.clientX > x0 + 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 290)
        && (e.clientY < y0 + 15.5*hojd)) { color = "purple"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 + 290)
        && (e.clientY < y0 + 15.5*hojd)) { color = "Orchid"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 + 290)
        && (e.clientY < y0 + 15.5*hojd)) { color = "plum"; }

if ((e.clientX > x0 + 0.5*bredd) && (e.clientX < x0 + bredd) && (e.clientY > y0 + 330)
        && (e.clientY < y0 + 17.5*hojd)) { color = "black"; }
if ((e.clientX > x0 + 2.5*bredd) && (e.clientX < x0 + 3.5*bredd) && (e.clientY > y0 + 330)
        && (e.clientY < y0 + 17.5*hojd)) { color = "darkgrey"; }
if ((e.clientX > x0 + 4.5*bredd) && (e.clientX < x0 + 5.5*bredd) && (e.clientY > y0 + 330)
        && (e.clientY < y0 + 17.5*hojd)) { color = "lightgrey"; }

if ((e.clientX > x0) && (e.clientX < x0 + 2*bredd) && (e.clientY > y0 + 370)
        && (e.clientY < y0 + 20*hojd)) { color = "white"; }
}
//n�r man ritar �r det denna funktion som kollar vilken f�rg och ser var man ska b�rja rita.
function myCircle(x, y, z, r, t, color)
{
   context.beginPath();
   context.arc(x,y,r,t, 2.2*Math.PI);
   context.fillStyle = color;
   context.fill(100);
//detta �r en funktion som g�r s� att man kan g�ra kvadrater med f�rger.
}
function myRectangle(x, y, w, l, color)
{
   context.fillStyle = color
   context.fillRect(x, y, w, l);
}
//Man st�ller in hur uppl�gget f�r texten ska vara och vilken ordning samt typsnitt
function myText(x, y, size, text, color,)
{
  context.font = size + "pt Lucida Console";
  context.fillStyle = color;
  context.fillText(text, x, y);
  context.strokestyle = color;
  context.lineWidth = 2;
//alla f�rgers rektanglar

  context.strokeRect( 50, 120, bredd, hojd);
  context.strokeRect( 90, 120, bredd, hojd);
  context.strokeRect( 130, 120, bredd, hojd);
  context.strokeRect( 50, 160, bredd, hojd);
  context.strokeRect( 90, 160, bredd, hojd);
  context.strokeRect( 130, 160, bredd, hojd);
  context.strokeRect( 50, 200, bredd, hojd);
  context.strokeRect( 90, 200, bredd, hojd);
  context.strokeRect( 130, 200, bredd, hojd);
  context.strokeRect( 50, 240, bredd, hojd);
  context.strokeRect( 90, 240, bredd, hojd);
  context.strokeRect( 130, 240, bredd, hojd);
  context.strokeRect( 50, 280, bredd, hojd);
  context.strokeRect( 90, 280, bredd, hojd);
  context.strokeRect( 130, 280, bredd, hojd);
  context.strokeRect( 50, 320, bredd, hojd);
  context.strokeRect( 90, 320, bredd, hojd);
  context.strokeRect( 130, 320, bredd, hojd);

  context.strokeRect( 50, 360, bredd, hojd);
  context.strokeRect( 90, 360, bredd, hojd);
  context.strokeRect( 130, 360, bredd, hojd);

  context.strokeRect( 50, 400, 40, 40);


//text rektanglarna
  context.strokeRect( 50, 40, 370, 20);
  context.strokeRect( 50, 60, 660, 20);
  context.strokeRect( 50, 80, 620, 20);
  context.strokeRect( 50, 100, 360, 20);

}
function draw(){
                // Denna funktion visar f�rgerna och texten.
        this.myRectangle(x0, y0 + 2 * distance, bredd, hojd, "darkred");
                this.myText(x0+105, y0 + distance+57, 15, "Red", "red");
        this.myRectangle(x0 + 40, y0 + 2 * distance, bredd, hojd, "red");
        this.myRectangle(x0 + 80, y0 + 2 * distance, bredd, hojd, "crimson");

        this.myRectangle(x0, y0 + 3 * distance, bredd, hojd, "darkOrange");
                this.myText(x0+105, y0 + distance+97, 15, "Orange", "orange");
        this.myRectangle(x0 + 40, y0 + 3 * distance, bredd, hojd, "orange");
        this.myRectangle(x0 + 80, y0 + 3 * distance, bredd, hojd, "Khaki");

        this.myRectangle(x0, y0 + 4 * distance, bredd, hojd, "goldenrod");
                this.myText(x0+105, y0 + distance+137, 15, "Yellow", "yellow");
        this.myRectangle(x0 + 40, y0 + 4 * distance, bredd, hojd, "gold");
        this.myRectangle(x0 + 80, y0 + 4 * distance, bredd, hojd, "yellow");

        this.myRectangle(x0, y0 + 5 * distance, bredd, hojd, "green");
                this.myText(x0+ 105, y0 + distance+177, 15, "Green", "green");
        this.myRectangle(x0 + 40, y0 + 5 * distance, bredd, hojd, "limegreen");
        this.myRectangle(x0 + 80, y0 + 5 * distance, bredd, hojd, "lime");

        this.myRectangle(x0, y0 + 6 * distance, bredd, hojd, "navy");
                this.myText(x0+105, y0 + distance+217, 15, "Blue", "Blue");
        this.myRectangle(x0 + 40, y0 + 6 * distance, bredd, hojd, "RoyalBlue");
        this.myRectangle(x0 + 80, y0 + 6 * distance, bredd, hojd, "blue");

        this.myRectangle(x0, y0 + 7 * distance, bredd, hojd, "purple");
                this.myText(x0+105, y0 + distance+257, 15, "Purple", "purple");
        this.myRectangle(x0 + 40, y0 + 7 * distance, bredd, hojd, "Orchid");
        this.myRectangle(x0 + 80, y0 + 7 * distance, bredd, hojd, "plum");

        this.myRectangle(x0, y0 + 8 * distance, bredd, hojd, "black");
                this.myText(x0+105, y0 + distance+297, 15, "Dark", "black");
        this.myRectangle(x0 + 40, y0 + 8 * distance, bredd, hojd, "darkgrey");
        this.myRectangle(x0 + 80, y0 + 8 * distance, bredd, hojd, "lightgrey");

        this.myRectangle(x0, y0 + 9 * distance, bredd, hojd, "white");
                this.myText(x0+50, y0 + distance+350, 15, "Eraser", "lightgrey");

        //rektangel som �r bl� l�ngst upp
        this.myRectangle(x0+-50, y0 + -1* distance, 1264, 40, "blue");
        //det �r texten d�r uppe s� att man ser vad man ska g�ra.
        this.myText(x0 + 0, y0 + distance+-50, 20,"PAINT 2.0", "white   ");//den stora texten
        this.myText(x0 + 0, y0 + distance+-25, 11, " Change color by hovering over the color.", "Black");//instruktion text
        this.myText(x0 + 0, y0 + distance+-5, 11, " Press the first letter in the color's name to change to the middle color.", "black");//instruktion text
        this.myText(x0 + 0, y0 + distance+35, 11, " Nummber 8 changes the background color.", "black");//instruktion text
        this.myText(x0 + 0, y0 + distance + 15, 11, " Nummber 1-7 changes the radius of the pen. Press ENTER to erase all.", "black");//instruktion text
        this.myText(x0 + 1020, y0 + distance + 510, 15, "Gabriel Wendler", "black");
        
}

// v�lj f�rg att rita med
window.addEventListener('keydown',this.check,false);

// function check(e) {
//    alert(e.keyCode);
//}

function check(e) {
    var code = e.keyCode 
// �ndra f�rg och vilka f�rger som finns samt vilka knappar som aktiverar de
    if (code == 82)
        color = "red"; //�ndrar f�rg
    if (code == 79)
        color = "orange";
    if (code == 89)
        color = "gold";
    if (code == 71)
        color = "limegreen";
    if (code == 66)
        color = "royalblue";
    if (code == 80)
        color = "Orchid";
    if (code == 68)
        color = "darkgrey";
    if (code == 69)
        color = "white";
// �ndra radie beroende p� vilket nummer du klickar p� tangentbordet.
if (code == 49)
    radie = 1;
    fill = true;
if (code == 50)
    radie = 5;
    fill = true;
if (code == 51)
    radie = 10;
    fill = true;
if (code == 52)
    radie = 15;
    fill = true;
if (code == 53)
    radie = 20;
    fill = true;
if (code == 54)
    radie = 25;
    fill = true;
if (code == 55)
    radie = 40;
    fill = true;
if (code == 56)
    radie = 4000;
    fill = true;
//g�r s� att man reloadar sidan och tar bort allt man har gjort.
if (code == 13)
      window.location.reload();

//g�r s� att man kan konvertera Celcius till Fahrenheit
}