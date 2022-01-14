/*

fraktal generator som använder 

https://codesandbox.io/s/fraktal-generator-forked-g76j8?file=/sketch.js
https://en.wikipedia.org/wiki/L-system#Types_of_L-systems
http://paulbourke.net/fractals/lsys/
https://www.sidefx.com/docs/houdini/nodes/sop/lsystem.html
http://www1.biologie.uni-hamburg.de/b-online/e28_3/lsys.html
https://www.kevs3d.co.uk/dev/lsystems/
https://piratefsh.github.io/p5js-art/public/lsystems/

*/

//INFO button
const info = document.getElementById("infoknapp");

info.addEventListener("click", function () {
  alert(
    "Den här generatorn använder sig av Lindenmayer system (https://en.wikipedia.org/wiki/L-system) för att generera fraktaler\nBra att veta: det finns lite buggar. \nTIPS är att trycka på DJUP några gånger så att det funkar rätt\nREGLER\nF = Move forward by line length drawing a line\n+ = Turn left by turning angle\n- = Turn right by turning angle\n[ = Push current drawing state onto stack\n] = Pop current drawing state from the stack\n1. Börja med att trycka på RESET \n2. \n3. \n4. \n5. \n6."
  );
});

//lite variablar
let genButton;
let resButton;
let guiText;
color_n = 0;
let generation = 0;
let maxGeneration = 5;
let length;
let angle;
//första load
let axiom = "F+F+F+F";
let rules = [
  {
    in: "F",
    out: "F+F-F-FF+F+F-F",
  },
];

//save button för egna input på fraktaler
const btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  var axiom2 = document.getElementById("axiom").value;
  var rules1 = document.getElementById("rules1").value;
  var rules2 = document.getElementById("rules2").value;
  alert(
    "Axiom: " + axiom2 + "\nRules in: " + rules1 + "\nRules out: " + rules2
  );
  axiom = axiom2;
  rules = [
    {
      in: rules1,
      out: rules2,
    },
  ];
  console.log(rules[0].in);
  console.log(rules[0].out);
});

//göm UI
var hidden = false;
function action() {
  hidden = !hidden;
  if (hidden) {
    document.getElementById("göm1").style.visibility = "hidden";
    document.getElementById("göm2").style.visibility = "hidden";
    document.getElementById("göm3").style.visibility = "hidden";
    document.getElementById("göm4").style.visibility = "hidden";
    document.getElementById("göm5").style.visibility = "hidden";
    document.getElementById("göm6").style.visibility = "hidden";
    document.getElementById("göm6").style.visibility = "hidden";
  } else {
    document.getElementById("göm1").style.visibility = "visible";
    document.getElementById("göm2").style.visibility = "visible";
    document.getElementById("göm3").style.visibility = "visible";
    document.getElementById("göm4").style.visibility = "visible";
    document.getElementById("göm5").style.visibility = "visible";
    document.getElementById("göm6").style.visibility = "visible";
    document.getElementById("göm6").style.visibility = "visible";
  }
}

let sentence = axiom;

//start funktion
function setup() {
  createCanvas(windowWidth - 40, windowHeight - 25);
  angle = radians(vinkel.value);
  length = segment_n * 3;
  turtle();
  drawGUI();
}

function generate() {
  length = segment_n * 3;

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
  //color

  if (color_n === 0) {
    stroke(255); //white
  }
  if (color_n === 1) {
    stroke(0, 0, 255); //blue
  }
  if (color_n === 2) {
    stroke(0, 128, 0); //green
  }
  if (color_n === 3) {
    stroke(255, 0, 0); //red
  }
  if (color_n === 4) {
    stroke(255, 165, 0); //orange
  }
  if (color_n === 5) {
    stroke(255, 255, 0); //yellow
  }

  console.log(color_n);
  translate(window.innerWidth / 2, window.innerHeight / 2);

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
}

var djupknapp = document.getElementById("djupknapp");
djupknapp.onclick = function () {
  if (generation < maxGeneration) {
    generate();
  }
  generation++;
  if (generation > 5) {
    generation = 1;
    sentence = axiom;
    generate();
  }
  var generationout = document.getElementById("generation-out");
  generationout.innerHTML = generation;
  var axiomout = document.getElementById("axiom-out");
  axiomout.innerHTML = axiom;
  var rules1out = document.getElementById("rules1-out");
  rules1out.innerHTML = rules[0].in;
  var rules2out = document.getElementById("rules2-out");
  rules2out.innerHTML = rules[0].out;
};

//skriver ut värden och saker på skärmer för användaren
function drawGUI() {
  genButton = createButton("DJUP");
  genButton.size(85, 20);
  genButton.position(-200, 260);
  genButton.mousePressed(function () {
    if (generation < maxGeneration) {
      generate();
    }
    generation++;
    if (generation > 5) {
      generation = 1;
      sentence = axiom;
      generate();
    }
    var generationout = document.getElementById("generation-out");
    generationout.innerHTML = generation;
    var axiomout = document.getElementById("axiom-out");
    axiomout.innerHTML = axiom;
    var rules1out = document.getElementById("rules1-out");
    rules1out.innerHTML = rules[0].in;
    var rules2out = document.getElementById("rules2-out");
    rules2out.innerHTML = rules[0].out;
  });
}

//!Exemepel knappar

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

var fraktal = (function () {
  //js funktion
  const c = document.getElementById("canvas");
  var ctx = c.getContext("2d");

  //får bredden och höjden av hemsidan du har på din enhet
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

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
      segment_n = 1;
    }
    document.getElementById("segment_n").innerHTML = segment_n;
    update();
  };
  //!RESET
  var reset = document.getElementById("resetknapp");
  reset.onclick = function () {
    sentence = axiom;
    turtle();
    vinkel.value = 40;
    segment_n = 3;
    generation = 2;
    //stönga av animera
    clearTimeout(t);
    animera.className = "knapp";
    c1 = 0;
    animera_n = 0;
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
  //!COLOR

  var color = document.getElementById("colorknapp");
  color.onclick = function () {
    color_n++;
    if (color_n === 6) {
      color_n = 0;
    }
    update();
  };

  timedCount = function () {
    var v = parseInt(vinkel.value);
    v = v + 1;

    if (v === 361) {
      v = 0;
    }
    //updatera UI
    vinkel.value = v;
    vinkelout.innerHTML = vinkel.value;
    //vänta
    t = setTimeout(timedCount, 200);
    update();
  };

  //!Uppdatera allt/////////////////////////////
  var update = function () {
    //skriver ut de nya väderna
    setup();
    console.log(generation + ":" + maxGeneration);
    //Updaterar sliders och bilder/knappar
    vinkelout.innerHTML = vinkel.value;
    document.getElementById("segment_n").innerHTML = segment_n;
    var generationout = document.getElementById("generation-out");
    generationout.innerHTML = generation;

    var axiomout = document.getElementById("axiom-out");
    axiomout.innerHTML = axiom;
    var rules1out = document.getElementById("rules1-out");
    rules1out.innerHTML = rules[0].in;
    var rules2out = document.getElementById("rules2-out");
    rules2out.innerHTML = rules[0].out;
    //sparar hashen för hemsidan
    save();
  };

  //!SAVE OCH LOAD
  var save = function () {
    var ruleid =
      "#" +
      vinkel.value +
      "," +
      segment_n +
      "," +
      generation +
      "," +
      axiom +
      "," +
      rules[0].in +
      "," +
      rules[0].out;
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
      generation = test[2];
      if (
        vinkel.value == undefined ||
        segment_n === undefined ||
        generation === undefined
      ) {
        //Sliders
        vinkel.value = 180;
        //Knappar
        segment_n = 1;
        generation = 1;
      }
    } else {
      //Sliders
      vinkel.value = 180;
      //Knappar
      segment_n = 1;
      //Knappar
      generation = 1;
    }
    save();
  };
  //!START
  load();

  //!EXEMPEL
  //Exemplerna är ifrån http://paulbourke.net/fractals/lsys/
  //save button för egna input på fraktaler
  const Kochcurve = document.getElementById("Kochcurve");
  Kochcurve.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "F+F-F-FF+F+F-F",
      },
    ];
    vinkel.value = 90;
    segment_n = 3;
    generation = 5;
    update();
  });

  const Sierpinskisquare = document.getElementById("Sierpinskisquare");
  Sierpinskisquare.addEventListener("click", function () {
    axiom = "F+XF+F+XF";
    rules = [
      {
        in: "X",
        out: "XF-F+F-XF+F+XF-F+F-X",
      },
    ];
    vinkel.value = 90;
    segment_n = 3;
    generation = 5;
    update();
  });

  const LSystemBushes1 = document.getElementById("L-System Bushes 1");
  LSystemBushes1.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "FF+[+F-F-F]-[-F+F+F]",
      },
    ];
    vinkel.value = 22.5;
    segment_n = 1;
    generation = 5;
    update();
  });

  const LSystemBushes2 = document.getElementById("L-System Bushes 2");
  LSystemBushes2.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "F[+FF][-FF]F[-F][+F]F",
      },
    ];
    vinkel.value = 35;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Board = document.getElementById("Board");
  Board.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F+F+F+FF",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Triangle = document.getElementById("Triangle");
  Triangle.addEventListener("click", function () {
    axiom = "F+F+F";
    rules = [
      {
        in: "F",
        out: "F-F+F",
      },
    ];
    vinkel.value = 120;
    segment_n = 1;
    generation = 5;
    update();
  });
  const Crystal = document.getElementById("Crystal");
  Crystal.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F++F+F",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const VonKochSnowflake = document.getElementById("Von Koch Snowflake");
  VonKochSnowflake.addEventListener("click", function () {
    axiom = "F++F++F";
    rules = [
      {
        in: "F",
        out: "F-F++F-F",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });
  const Tiles = document.getElementById("Tiles");
  Tiles.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F-F+F+FF",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });

  const Rings = document.getElementById("Rings");
  Rings.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [
      {
        in: "F",
        out: "FF+F+F+F+F+F-F",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const Lévycurve = document.getElementById("Lévy curve");
  Lévycurve.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "+F--F+",
      },
    ];
    vinkel.value = 45;
    segment_n = 1;
    generation = 5;
    update();
  });
  const HexagonalGosper = document.getElementById("Hexagonal Gosper");
  HexagonalGosper.addEventListener("click", function () {
    axiom = "XF";
    rules = [
      {
        in: "X",
        out: "X+YF++YF-FX--FXFX-YF+",
      },
      {
        in: "Y",
        out: "-FX+YFYF++YF+FX--FX-Y",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });
  const DragonCurve = document.getElementById("Dragon Curve");
  DragonCurve.addEventListener("click", function () {
    axiom = "FX";
    rules = [
      {
        in: "X",
        out: "X+YF+",
      },
      {
        in: "Y",
        out: "-FX-Y",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const SierpinskiArrowhead = document.getElementById("Sierpinski Arrowhead");
  SierpinskiArrowhead.addEventListener("click", function () {
    axiom = "YF";
    rules = [
      {
        in: "X",
        out: "YF+XF+Y",
      },
      {
        in: "Y",
        out: "XF-YF-X",
      },
    ];
    vinkel.value = 60;
    segment_n = 1;
    generation = 5;
    update();
  });
  const QuadraticSnowflake = document.getElementById("Quadratic Snowflake");
  QuadraticSnowflake.addEventListener("click", function () {
    axiom = "F";
    rules = [
      {
        in: "F",
        out: "F-F+F+F-F",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const PeanoCurve = document.getElementById("Peano Curve");
  PeanoCurve.addEventListener("click", function () {
    axiom = "X";
    rules = [
      {
        in: "X",
        out: "XFYFX+F+YFXFY-F-XFYFX",
      },
      {
        in: "Y",
        out: "YFXFY-F-XFYFX+F+YFXFY",
      },
    ];
    vinkel.value = 90;
    segment_n = 1;
    generation = 5;
    update();
  });
  const snowflake = document.getElementById("Snowflake");
  snowflake.addEventListener("click", function () {
    axiom = "F-F-F-F-F";
    rules = [
      {
        in: "F",
        out: "F-F++F+F-F-F",
      },
    ];
    vinkel.value = 72;
    segment_n = 1;
    generation = 5;
    update();
  });
  const KrishnaAnklets = document.getElementById("Krishna Anklets");
  KrishnaAnklets.addEventListener("click", function () {
    axiom = "-X--X";
    rules = [
      {
        in: "X",
        out: "XFX--XFX",
      },
    ];
    vinkel.value = 45;
    segment_n = 1;
    generation = 5;
    update();
  });
})();
