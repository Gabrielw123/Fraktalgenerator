/*
INFO LÄS README.txt

Källor för lite info
https://www.sidefx.com/docs/houdini/nodes/sop/lsystem.html
https://en.wikipedia.org/wiki/L-system#Types_of_L-systems
http://paulbourke.net/fractals/lsys/
http://www1.biologie.uni-hamburg.de/b-online/e28_3/lsys.html

generator
https://www.kevs3d.co.uk/dev/lsystems/
https://piratefsh.github.io/p5js-art/public/lsystems/
https://codesandbox.io/s/fraktal-generator-forked-g76j8?file=/sketch.js
*/

//hur snabbt den animerar
let animatespeed = 100;
//hur snabbt färgen ändras på alternativ 6
let colorspeed = 300;
//random variablar
let arr = ["F", "F", "+", "-"];
let hello = ["", "", "", "", ""];
//lite variablar
let genKnapp;
//färg variabel mätare

let generation = 0;
let maxGeneration = 5;
let längd;
let angle;
let info_n = 0;

//huvud variablar
let color_n = 0;
let vinkel = 0;
let djup = 0;
let x = 0;
let y = 0;

//color variablar
let r = 255,
  g = 0,
  b = 0;
//första fraktalen vid start
let axiom = "F++F++F";
let rules = [{
  in: "F",
  out: "F-F++F-F",
}, ];
let sentence = axiom;
//Andra rad
animera_n = 0;
//timer räknare
let t;

//göm från början
document.getElementById("göminfo").style.visibility = "hidden";

//Random funktion
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //så man kan genera ett tal mellan två värden.
}

// Canvas Mouse Drag
let isDown = false;
let x1 = window.innerWidth / 2;
let y1 = window.innerHeight / 2;
let dragDiff = {
  x1: 0,
  y1: 0
};

function BörjaDra(e) {
  if (e.offsetX > 180) {
    isDown = true;
    dragDiff.x1 = e.offsetX - x1;
    dragDiff.y1 = e.offsetY - y1;
    turtle();
  }
}

function stopDra(e) {
  if (e.offsetX > 180) {
    isDown = false;
    stopDra.x1 = e.offsetX;
    stopDra.y1 = e.offsetY;
  }
}

function movedrag(e) {
  if (e.offsetX > 180) {
    e.preventDefault();
    if (isDown) {
      x1 = e.offsetX - dragDiff.x1;
      y1 = e.offsetY - dragDiff.y1;
      turtle();
    }
  }
}
let scale = 1

function zoom(e) {
  scale += e.deltaY * -0.01;
  // Restrict scale
  scale = Math.min(Math.max(1, scale), 10);
  setup();
}
//kollar om man gör någon av dessa funktioner ex mousedown
const move = document.getElementById("move");
move.addEventListener("mousedown", BörjaDra);
move.addEventListener("mouseup", stopDra);
move.addEventListener("mousemove", movedrag);
move.addEventListener("mousewheel", zoom);

//start funktion
function setup() {
  createCanvas(windowWidth - 40, windowHeight - 25);
  angle = radians(vinkel.value);
  längd = scale;
  turtle();
}

//color loop
$(document).ready(function () {
  //color problem
  setInterval(function () {
    if (r > 0 && b <= 0) {
      r -= 10;
      g += 10;
    }
    if (g > 0 && r <= 0) {
      g -= 10;
      b += 10;
    }
    if (b > 0 && g <= 0) {
      r += 10;
      b -= 10;
    }
    $("#color").text("rgb(" + r + "," + g + "," + b + ")");
    $("#color").css("color", "rgb(" + r + "," + g + "," + b + ")");
    turtle();
  }, colorspeed);
});

//generera fraktal
function generera() {
  längd = scale;
  console.log(längd);
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
//ändra färg och steg fraktal
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
    stroke(r, g, b); //rgb flera färger
  }
  //vart man ska börja rita
  translate(x1, y1);
  //för varje character i "sentence" kör loopen
  for (let i = 0; i <= sentence.length; i++) {
    let currentChar = sentence.charAt(i);

    //olika funktioner för de olika characters
    if (currentChar === "F") {
      line(0, 0, 0, -längd);
      translate(0, -längd);
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

//!UI
let fraktal = (function () {
  //!göm UI
  let gömknapp = document.getElementById("gömknapp");
  let hidden = false;
  gömknapp.onclick = function () {
    hidden = !hidden;
    if (hidden) {
      document.getElementById("göm").style.visibility = "hidden";
    } else {
      document.getElementById("göm").style.visibility = "visible";
    }
  };

  //!INFO
  let infoknapp = document.getElementById("infoknapp");
  let hiddeninfo = true;
  infoknapp.onclick = function () {
    hiddeninfo = !hiddeninfo;
    if (hiddeninfo) {
      document.getElementById("göminfo").style.visibility = "hidden";
      document.getElementById("göminfo").style.height = "0px";
      document.getElementById("göm2").style.visibility = "visible";
      document.getElementById("göm2").style.height = "315px";

    } else {
      document.getElementById("göminfo").style.visibility = "visible";
      document.getElementById("göminfo").style.height = "328px";
      document.getElementById("göm2").style.visibility = "hidden";
      document.getElementById("göm2").style.height = "0%";
    }
    info_n++;
    if (info_n === 1) {
      infoknapp.className = "knappon";
    }
    if (info_n === 2) {
      infoknapp.className = "knapp";
      info_n = 0;
    }
  };
  //!COLOR
  let color = document.getElementById("colorknapp");
  color.onclick = function () {
    color_n++;
    if (color_n === 6) {
      color_n = 0;
    }
    update();
  };

  timedCount = function () {
    let v = parseInt(vinkel.value);
    v = v + 1;

    if (v === 361) {
      v = 0;
    }
    //updatera UI
    vinkel.value = v;
    vinkelout.innerHTML = vinkel.value;
    //vänta
    t = setTimeout(timedCount, animatespeed);
    update();
  };

  //!SLIDERS VINKEL
  vinkel = document.getElementById("vinkel");
  let vinkelout = document.getElementById("vinkel-out");
  vinkelout.innerHTML = vinkel.value;

  //gör saker med vinkel
  vinkel.oninput = function () {
    vinkelout.innerHTML = this.value;
    update();
  };

  //!DJUP
  djup = document.getElementById("djupknapp");
  let generationout = document.getElementById("generation-out");
  generationout.innerHTML = djup.value;

  djup.oninput = function () {
    sentence = axiom;
    generation = djup.value;
    for (let i = 0; i < djup.value; i++) {
      generera();
    }
    generationout.innerHTML = this.value;
    update();
  };


  //!RANDOM
  let random = document.getElementById("randomknapp");
  random.onclick = function () {
    for (let i = 0; i < 8; i++) {
      hello[i] = arr[Math.floor(Math.random() * arr.length)];
    }
    axiom = "F" + hello[5] + hello[6] + hello[7];
    rules = [{
      in: "F",
      out: "F" +
        hello[0] +
        hello[1] +
        hello[2] +
        hello[3] +
        hello[4] +
        hello[5] +
        hello[6] +
        hello[7],
    }, ];
    vinkel.value = getRandomInt(0, 361);
    scale = 4;
    djup.value = 3;
    update();
  };

  //!ANIMERA
  let animera = document.getElementById("animeraknapp");
  animera.onclick = function () {
    animera_n++;
    if (animera_n === 1) {
      timedCount();
      animera.className = "knappon";
    }
    if (animera_n === 2) {
      clearTimeout(t);
      animera.className = "knapp";
      animera_n = 0;
    }
  };

  //!SAVE button för egna input på fraktaler
  const spara = document.getElementById("spara");
  spara.onclick = function () {
    axiom = document.getElementById("axiom").value;
    let stringrules = document.getElementById("rules2").value;
    if (stringrules.includes("=")) {
      const arrules = stringrules.split("=");
      rules = [{
        in: arrules[0],
        out: arrules[1],
      }, ];
    }
    if (axiom.length <= 0) {
      alert("OBS: Du har ingen AXIOM");
    }
    if (!stringrules.includes("=")) {
      alert("OBS: Du måste ha ett (=) i RULES");
    }
    if (rules[0].in.length >= 2 || rules[0].in.length <= 0) {
      alert("OBS: Du måste ha ETT tecken före (=) i RULES");
    }
    if (rules[0].out.length <= 0) {
      alert("OBS: Du har inga RULES efter (=)");
    }
    if (!axiom.includes(rules[0].in)) {
      alert(
        "OBS: Ditt tecken i RULES före (=) har inte något tecken som förekommer i AXIOMEN"
      );
    }
    confirm(
      "OBS: Tryck på DJUP för att se din fraktal\n" +
      "Axiom: " +
      axiom +
      "\nRules in: " +
      rules[0].in +
      "\nRules out: " +
      rules[0].out
    );
  };

  //!RESET
  let reset = document.getElementById("resetknapp");
  reset.onclick = function () {
    color_n = 0;
    vinkel.value = 60;
    scale = 5;
    djup.value = 1;
    x1 = window.innerWidth / 2;
    y1 = window.innerHeight / 2;
    axiom = "F++F++F";
    rules = [{
      in: "F",
      out: "F-F++F-F",
    }, ];
    sentence = axiom;
    //stönga av animera
    clearTimeout(t);
    animera.className = "knapp";
    animera_n = 0;
    //update this
    update();
  };

  //!Uppdatera allt/////////////////////////////
  let update = function () {
    //skriver ut de nya väderna
    setup();
    //animeringshastighet gör det snabbare när det är närare visa värden
    if (
      (vinkel.value > 150 && vinkel.value < 220) ||
      vinkel.value > 330 ||
      vinkel.value < 30
    ) {
      animatespeed = 50;
    }
    if (
      (vinkel.value > 30 && vinkel.value < 150) ||
      (vinkel.value > 220 && vinkel.value < 330)
    ) {
      animatespeed = 100;
    }

    //Updaterar sliders och knappar
    vinkelout.innerHTML = vinkel.value;
    generationout.innerHTML = djup.value;
    document.getElementById("färg_n").innerHTML = color_n + 1;
    document.getElementById("axiom-out").innerHTML = axiom;
    document.getElementById("rules1-out").innerHTML = rules[0].in;
    document.getElementById("rules2-out").innerHTML = rules[0].out;
    //sparar hashen för hemsidan
    save();
  };

  //!SAVE OCH LOAD
  let save = function () {
    let ruleid =
      "#" +
      vinkel.value +
      "," +
      scale +
      "," +
      djup.value +
      "," +
      axiom +
      "," +
      rules[0].in +
      "," +
      rules[0].out;
    window.location = String(window.location).replace(/\#.*$/, "") + ruleid;
  };

  let load = function () {
    let d = window.location.toString();
    if (d.includes("#")) {
      const myArr = d.split("#");
      const test = myArr[1].split(",");
      //Sliders
      vinkel.value = test[0];
      //Knappar
      scale = test[1];
      djup.value = test[2];
      axiom = test[3];
      rules[0].in = test[4];
      rules[0].out = test[5];

      if (
        vinkel.value == undefined ||
        scale === undefined ||
        djup.value === undefined ||
        axiom === undefined ||
        rules[0].in === undefined ||
        rules[0].out === undefined
      ) {
        //Sliders
        vinkel.value = 60;
        //Knappar
        scale = 1;
        djup.value = 1;
        let axiom = "F++F++F";
        let rules = [{
          in: "F",
          out: "F-F++F-F",
        }, ];
      }
    } else {
      //Sliders
      vinkel.value = 60;
      //Knappar
      scale = 1;
      //Knappar
      djup.value = 1;
      let axiom = "F++F++F";
      let rules = [{
        in: "F",
        out: "F-F++F-F",
      }, ];
    }
    save();
  };
  //!START
  load();

  //!EXEMPEL
  const Kochcurve = document.getElementById("Kochcurve");
  Kochcurve.addEventListener("click", function () {
    axiom = "-F";
    rules = [{
      in: "F",
      out: "F+F--F+F",
    }, ];
    vinkel.value = 60;
    scale = 5;
    djup.value = 1;
    update();
  });
  const Sierpinskisquare = document.getElementById("Sierpinskisquare");
  Sierpinskisquare.addEventListener("click", function () {
    axiom = "F+XF+F+XF";
    rules = [{
      in: "X",
      out: "XF-F+F-XF+F+XF-F+F-X",
    }, ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });

  const LSystemBushes1 = document.getElementById("L-System Bushes 1");
  LSystemBushes1.addEventListener("click", function () {
    axiom = "F";
    rules = [{
      in: "F",
      out: "FF+[+F-F-F]-[-F+F+F]",
    }, ];
    vinkel.value = 22.5;
    scale = 5;
    djup.value = 1;
    update();
  });

  const LSystemBushes2 = document.getElementById("L-System Bushes 2");
  LSystemBushes2.addEventListener("click", function () {
    axiom = "F";
    rules = [{
      in: "F",
      out: "F[+FF][-FF]F[-F][+F]F",
    }, ];
    vinkel.value = 35;
    scale = 5;
    djup.value = 1;
    update();
  });

  const Board = document.getElementById("Board");
  Board.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [{
      in: "F",
      out: "FF+F+F+F+FF",
    }, ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });

  const Triangle = document.getElementById("Triangle");
  Triangle.addEventListener("click", function () {
    axiom = "F+F+F";
    rules = [{
      in: "F",
      out: "F-F+F",
    }, ];
    vinkel.value = 120;
    scale = 5;
    djup.value = 1;
    update();
  });
  const Crystal = document.getElementById("Crystal");
  Crystal.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [{
      in: "F",
      out: "FF+F++F+F",
    }, ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });
  const VonKochSnowflake = document.getElementById("Von Koch Snowflake");
  VonKochSnowflake.addEventListener("click", function () {
    axiom = "F++F++F";
    rules = [{
      in: "F",
      out: "F-F++F-F",
    }, ];
    vinkel.value = 60;
    scale = 5;
    djup.value = 1;
    update();
  });
  const Tiles = document.getElementById("Tiles");
  Tiles.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [{
      in: "F",
      out: "FF+F-F+F+FF",
    }, ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });

  const Rings = document.getElementById("Rings");
  Rings.addEventListener("click", function () {
    axiom = "F+F+F+F";
    rules = [{
      in: "F",
      out: "FF+F+F+F+F+F-F",
    }, ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });
  const Lévycurve = document.getElementById("Lévy curve");
  Lévycurve.addEventListener("click", function () {
    axiom = "F";
    rules = [{
      in: "F",
      out: "+F--F+",
    }, ];
    vinkel.value = 45;
    scale = 5;
    djup.value = 1;
    update();
  });
  const HexagonalGosper = document.getElementById("Hexagonal Gosper");
  HexagonalGosper.addEventListener("click", function () {
    axiom = "XF";
    rules = [{
        in: "X",
        out: "X+YF++YF-FX--FXFX-YF+",
      },
      {
        in: "Y",
        out: "-FX+YFYF++YF+FX--FX-Y",
      },
    ];
    vinkel.value = 60;
    scale = 5;
    djup.value = 1;
    update();
  });
  const DragonCurve = document.getElementById("Dragon Curve");
  DragonCurve.addEventListener("click", function () {
    axiom = "FX";
    rules = [{
        in: "X",
        out: "X+YF+",
      },
      {
        in: "Y",
        out: "-FX-Y",
      },
    ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });
  const SierpinskiArrowhead = document.getElementById("Sierpinski Arrowhead");
  SierpinskiArrowhead.addEventListener("click", function () {
    axiom = "YF";
    rules = [{
        in: "X",
        out: "YF+XF+Y",
      },
      {
        in: "Y",
        out: "XF-YF-X",
      },
    ];
    vinkel.value = 60;
    scale = 5;
    djup.value = 1;
    update();
  });
  const QuadraticSnowflake = document.getElementById("Quadratic Snowflake");
  QuadraticSnowflake.addEventListener("click", function () {
    axiom = "F";
    rules = [{
      in: "F",
      out: "F-F+F+F-F",
    }, ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });
  const PeanoCurve = document.getElementById("Peano Curve");
  PeanoCurve.addEventListener("click", function () {
    axiom = "X";
    rules = [{
        in: "X",
        out: "XFYFX+F+YFXFY-F-XFYFX",
      },
      {
        in: "Y",
        out: "YFXFY-F-XFYFX+F+YFXFY",
      },
    ];
    vinkel.value = 90;
    scale = 5;
    djup.value = 1;
    update();
  });
  const snowflake = document.getElementById("Snowflake");
  snowflake.addEventListener("click", function () {
    axiom = "F-F-F-F-F";
    rules = [{
      in: "F",
      out: "F-F++F+F-F-F",
    }, ];
    vinkel.value = 72;
    scale = 5;
    djup.value = 1;
    update();
  });
  const KrishnaAnklets = document.getElementById("Krishna Anklets");
  KrishnaAnklets.addEventListener("click", function () {
    axiom = "-X--X";
    rules = [{
      in: "X",
      out: "XFX--XFX",
    }, ];
    vinkel.value = 45;
    scale = 5;
    djup.value = 1;
    update();
  });
  const Wendler = document.getElementById("Wendler");
  Wendler.addEventListener("click", function () {
    axiom = "-X--X";
    rules = [{
      in: "X",
      out: "XFX--XFX",
    }, ];
    vinkel.value = 45;
    scale = 5;
    djup.value = 1;
    update();
  });
})();