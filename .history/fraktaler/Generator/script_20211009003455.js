const c = document.getElementById("canvas");
const ctx = c.getContext("2d"); // context variable is used to draw on a 2D plane

const createTriangle = (pos, sidelen) => {
  ctx.beginPath(); 
  ctx.moveTo(...pos); // go to the left vertex

  // note that (0,0) in canvas is the top left, so 'up' on the vertical component would use substraction.
  ctx.lineTo(pos[0] + sidelen / 2, pos[1] - sidelen * Math.sin(Math.PI/3)); // draw line from left vertex to top vertex
  ctx.lineTo(pos[0] + sidelen, pos[1]); // draw line from top vertex to right vertex
  ctx.lineTo(...pos); // draw line from right vertex back to left vertex
  ctx.closePath();
  ctx.fill(); // fill triangle
};
const createSierpinskiTriangle = (pos, sidelen, depth) => {
    const innerTriangleSidelen = sidelen / 2; // side length of inner triangles is half the side length of the outer triangle
    const innerTrianglesPositions = [
      pos,
      [ pos[0] + innerTriangleSidelen, pos[1] ],
      [ pos[0] + innerTriangleSidelen / 2, pos[1] - Math.sin(Math.PI/3) * innerTriangleSidelen ]
    ]; // these positions are the same as what was used in the createTriangle function
    if(depth == 0) {
      innerTrianglesPositions.forEach((trianglePosition) => {
        createTriangle(trianglePosition, innerTriangleSidelen);
      });
    } else {
      innerTrianglesPositions.forEach((trianglePosition) => {
        createSierpinskiTriangle(trianglePosition, innerTriangleSidelen, depth - 1);
      });
    }
  }


var slider = document.getElementById("slider_s");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
createSierpinskiTriangle([0, 550], 550, slider.value)

slider.oninput = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  output.innerHTML = this.value;
  createSierpinskiTriangle([0, 550], 550, this.value);
  
}
