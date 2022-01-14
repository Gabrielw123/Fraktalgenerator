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
  angle = radians(vinkel.value);
  length = height / 4;
  turtle();
  drawGUI();
}

function generate() {
  if (segment_n == 0) {
    length *= 0.2;
  }
  if (segment_n == 1) {
    length *= 0.3;
  }
  if (segment_n == 2) {
    length *= 0.4;
  }
  if (segment_n == 3) {
    length *= 0.5;
  }

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
  genButton.position(10, 10);
  genButton.mousePressed(function () {
    if (generation < maxGeneration) generate();
  });

  resButton = createButton("Reset");
  resButton.size(100, 25);
  resButton.position(130, 10);
  resButton.mousePressed(function () {
    sentence = axiom;
    length = height / 4;
    generation = 0;
    vinkel.value = 180;
    vinkelout.innerHTML = vinkel.value;
    turtle();
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

  //!ZOOM FUNKTION /////////////////////////////
  //Har lånat zoom funktioen från https://stackoverflow.com/questions/59352578/how-to-zoom-an-image-in-canvas-from-center-of-canvas?noredirect=1&lq=1
  function redraw() {
    // Clear the entire c
    var p1 = ctx.transformedPoint(0, 0);
    var p2 = ctx.transformedPoint(c.width, c.height);
    ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

    // Alternatively:
    // ctx.save();
    // ctx.setTransform(1,0,0,1,0,0);
    // ctx.clearRect(0,0,c.width,c.height);
    // ctx.restore();
  }
  window.onload = function () {
    trackTransforms(ctx);
    update();
    redraw();
    var lastX = c.width / 2,
      lastY = c.height / 2;
    var dragStart, dragged;
    c.addEventListener(
      "mousedown",
      function (evt) {
        document.body.style.mozUserSelect =
          document.body.style.webkitUserSelect =
          document.body.style.userSelect =
            "none";
        lastX = evt.offsetX || evt.pageX - c.offsetLeft;
        lastY = evt.offsetY || evt.pageY - c.offsetTop;
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
      },
      false
    );
    c.addEventListener(
      "mousemove",
      function (evt) {
        lastX = evt.offsetX || evt.pageX - c.offsetLeft;
        lastY = evt.offsetY || evt.pageY - c.offsetTop;
        dragged = true;
        if (dragStart) {
          var pt = ctx.transformedPoint(lastX, lastY);
          ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
          redraw();
          update();
        }
      },
      false
    );
    c.addEventListener(
      "mouseup",
      function (evt) {
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1 : 1);
      },
      false
    );

    var scaleFactor = 1.1;
    var zoom = function (clicks) {
      var pt = ctx.transformedPoint(lastX, lastY);
      ctx.translate(pt.x, pt.y);
      var factor = Math.pow(scaleFactor, clicks);
      ctx.scale(factor, factor);
      ctx.translate(-pt.x, -pt.y);
      redraw();
      update();
    };

    var handleScroll = function (evt) {
      var delta = evt.wheelDelta
        ? evt.wheelDelta / 40
        : evt.detail
        ? -evt.detail
        : 0;
      if (delta) zoom(delta);
      return evt.preventDefault() && false;
    };
    c.addEventListener("DOMMouseScroll", handleScroll, false);
    c.addEventListener("mousewheel", handleScroll, false);
  };

  // Adds ctx.getTransform() - returns an SVGMatrix
  // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
  function trackTransforms(ctx) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function () {
      return xform;
    };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function () {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(ctx);
    };
    var restore = ctx.restore;
    ctx.restore = function () {
      xform = savedTransforms.pop();
      return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(ctx, sx, sy);
    };
    var rotate = ctx.rotate;
    ctx.rotate = function (radians) {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(ctx, radians);
    };
    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
      xform = xform.translate(dx, dy);
      return translate.call(ctx, dx, dy);
    };
    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
      var m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(ctx, a, b, c, d, e, f);
    };
    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };
    var pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
  }

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
    if (segment_n === 4) {
      segment_n = 0;
    }
    document.getElementById("segment_n").innerHTML = segment_n;
    update();
  };

  //DJUP
  var djup = document.getElementById("djupknapp");
  djup.onclick = function () {
    djup_n++;
    if (djup_n === 6) {
      djup_n = 0;
    }
    document.getElementById("djup_n").innerHTML = djup_n;
    update();
  };

  //!UNDRE KNAPPAR/////////////////////////////////////

  //!RESET
  var reset = document.getElementById("resetknapp");
  reset.onclick = function () {
    vinkel.value = 180;
    vinkelout.innerHTML = vinkel.value;

    segment_n = 0;
    document.getElementById("segment_n").innerHTML = segment_n;
    djup_n = 0;
    document.getElementById("djup_n").innerHTML = djup_n;
    //update this
    update();
  };

  //!RANDOM
  var random = document.getElementById("randomknapp");
  random.onclick = function () {
    vinkel.value = getRandomInt(0, 361);
    vinkelout.innerHTML = vinkel.value;
    segment_n = getRandomInt(0, 5);
    document.getElementById("segment_n").innerHTML = segment_n;
    djup_n = getRandomInt(0, 6);
    document.getElementById("djup_n").innerHTML = djup_n;
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
    redraw();
    //tar bort allt ritat på skärmen
    clear();
    //skriver ut de nya väderna, gör prepare al, function, render, morelines
    setup();

    //segments(segment_n);

    //djup(djup_n);

    //Skriva ut siffror
    /*console.log(
      "vinkel",
      vinkel.value,
     
      "segment",
      segment_n,
      "djup",
      djup_n
    );*/

    //Updaterar sliders och bilder/knappar
    vinkelout.innerHTML = vinkel.value;
    document.getElementById("segment_n").innerHTML = segment_n;
    document.getElementById("djup_n").innerHTML = djup_n;
    //sparar hashen för hemsidan
    save();
  };

  //!SAVE OCH LOAD
  var save = function () {
    var ruleid = "#" + vinkel.value + "," + segment_n + "," + djup_n;
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
      djup_n = test[2];

      if (
        vinkel.value == undefined ||
        segment_n === undefined ||
        djup_n == undefined
      ) {
        //Sliders
        vinkel.value = 180;
        //Knappar
        segment_n = 0;
        djup_n = 0;
      }
    } else {
      //Sliders
      vinkel.value = 180;
      //Knappar
      segment_n = 0;
      djup_n = 0;
    }
    save();
  };
  //!START
  load();
})();
