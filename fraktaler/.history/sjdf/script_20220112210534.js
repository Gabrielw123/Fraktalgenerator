var r = 255,
  g = 0,
  b = 0;
generation = "sd";
setInterval(function () {
  if (r > 0 && b == 0) {
    r--;
    g++;
  }
  if (g > 0 && r == 0) {
    g--;
    b++;
  }
  if (b > 0 && g == 0) {
    r++;
    b--;
  }
  var generationout = document.getElementById("generation-out");
  generationout.innerHTML = generation;
  "#color".text("rgb(" + r + "," + g + "," + b + ")");
  "#color".css("color", "rgb(" + r + "," + g + "," + b + ")");
}, 10);
