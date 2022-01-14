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
  createCanvas(windowWidth, windowHeight);
  angle = radians(120);
  length = height / 4;
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
  genButton = createButton("Generate");
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
    turtle();
  });
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
  background(1);
  turtle();
};
