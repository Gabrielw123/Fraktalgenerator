/*

lite faktra om denna uppgift



https://codesandbox.io/s/fraktal-generator-forked-g76j8?file=/sketch.js
https://en.wikipedia.org/wiki/L-system#Types_of_L-systems
http://paulbourke.net/fractals/lsys/
https://www.sidefx.com/docs/houdini/nodes/sop/lsystem.html
http://www1.biologie.uni-hamburg.de/b-online/e28_3/lsys.html
https://www.kevs3d.co.uk/dev/lsystems/
https://piratefsh.github.io/p5js-art/public/lsystems/

*/

let genButton;
let resButton;
let guiText;

let generation = 0;
let maxGeneration = 6;

let length;
let angle;
let axiom = "F";
let sentence = axiom;

let rules = [
  {
    in: "F",
    out: "FF+[+F-F-F]-[-F+F+F]",
  },
];

function setup() {
  createCanvas(windowWidth - 40, windowHeight - 25);
  angle = radians(vinkel.value);
  length = segment_n * 4;
  turtle();
  drawGUI();
}

function generate() {
  length *= 0.5;

  let nextSentence = "";

  for (let i = 0; i < sentence.length; i++) {
    let found = false;
    let currentChar = sentence.charAt(i);

    for (let j = 0; j < rules.length; j++) {
      if (currentChar === rules[j].in) {
        found = true;
        nextSentence += rules[j].out;
        break;
      }
    }
    if (!found) {
      nextSentence += currentChar;
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  resetMatrix();
  background(0);
  stroke(255);
  translate(width / 2, height);

  for (let i = 0; i <= sentence.length; i++) {
    let currentChar = sentence.charAt(i);

    if (currentChar === "F") {
      line(0, 0, 0, -length);
      translate(0, -length);
    } else if (currentChar === "+") {
      rotate(angle);
    } else if (currentChar === "-") {
      rotate(-angle);
    } else if (currentChar === "[") {
      push();
    } else if (currentChar === "]") {
      pop();
    }
  }
  generation++;
}

function drawGUI() {
  genButton = createButton("DJUP");
  genButton.size(100, 25);
  genButton.border - radius(3);
  genButton.position(window.innerWidth / 2 - 50, window.innerHeight - 50);
  genButton.mousePressed(function () {
    if (generation < maxGeneration) generate();
    update();
  });
}

//Andra rad
animera_n = 0;

var c1 = 0;
var t;
var timer_is_on = 0;

//Random funktion
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//TODO

var fraktal = (function () {
  //js funktion
  const c = document.getElementById("canvas");
  var ctx = c.getContext("2d");

  //får bredden och höjden av hemsidan du har på din enhet
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  //!EGENSKAPER KNAPPAR//////////////////////////////////////

  //!CLEAR
  var clear = function () {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //!SLIDERS
  var vinkel = document.getElementById("vinkel");
  var vinkelout = document.getElementById("vinkel-out");
  vinkelout.innerHTML = vinkel.value;

  //gör saker med vinkel
  vinkel.oninput = function () {
    vinkelout.innerHTML = this.value;
    update();
  };

  //SEGMENT
  var segment = document.getElementById("längdknapp");
  segment.onclick = function () {
    segment_n++;
    if (segment_n === 6) {
      segment_n = 0;
    }
    document.getElementById("segment_n").innerHTML = segment_n;
    update();
  };

  //!UNDRE KNAPPAR/////////////////////////////////////

  //!RESET
  var reset = document.getElementById("resetknapp");
  reset.onclick = function () {
    vinkel.value = 180;
    vinkelout.innerHTML = vinkel.value;
    sentence = axiom;
    generation = 0;
    turtle();
    segment_n = 0;
    document.getElementById("segment_n").innerHTML = segment_n;
    //update this
    update();
  };

  //!RANDOM
  var random = document.getElementById("randomknapp");
  random.onclick = function () {
    vinkel.value = getRandomInt(0, 361);
    vinkelout.innerHTML = vinkel.value;
    update();
  };

  //!ANIMERA

  var animera = document.getElementById("animeraknapp");
  animera.onclick = function () {
    animera_n++;
    if (animera_n === 1) {
      timedCount();
      animera.className = "knappon";
    }
    if (animera_n === 2) {
      clearTimeout(t);
      animera.className = "knapp";
      c1 = 0;
      animera_n = 0;
    }
  };

  timedCount = function () {
    var v = parseInt(vinkel.value);
    v = v + 1;

    if (v === 361) {
      v = 0;
    }
    vinkel.value = v;

    vinkelout.innerHTML = vinkel.value;

    console.log(vinkel.value);
    t = setTimeout(timedCount, 10);

    update();
  };

  //!RITA FRAKTALEN/////////////////////////////

  //!Uppdatera allt/////////////////////////////
  var update = function () {
    //tar bort allt ritat på skärmen
    clear();
    //skriver ut de nya väderna, gör prepare al, function, render, morelines
    setup();

    //segments(segment_n);

    //Skriva ut siffror
    /*console.log(
      "vinkel",
      vinkel.value,
     
      "segment",
      segment_n,
     
    );*/

    //Updaterar sliders och bilder/knappar
    vinkelout.innerHTML = vinkel.value;
    document.getElementById("segment_n").innerHTML = segment_n;

    //sparar hashen för hemsidan
    save();
  };

  //!SAVE OCH LOAD
  var save = function () {
    var ruleid = "#" + vinkel.value + "," + segment_n;
    window.location = String(window.location).replace(/\#.*$/, "") + ruleid;
  };

  var load = function () {
    let d = window.location.toString();
    if (d.includes("#")) {
      const myArr = d.split("#");

      const test = myArr[1].split(",");
      //Sliders
      vinkel.value = test[0];

      //Knappar
      segment_n = test[1];

      if (vinkel.value == undefined || segment_n === undefined) {
        //Sliders
        vinkel.value = 180;
        //Knappar
        segment_n = 0;
      }
    } else {
      //Sliders
      vinkel.value = 180;
      //Knappar
      segment_n = 0;
    }
    save();
  };
  //!START
  load();
})();
