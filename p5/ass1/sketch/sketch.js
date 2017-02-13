/////Josef Albers
///Homage to the Square: Against Deep Blue
function setup() {

  //canvas size 800 x 800
    createCanvas(1024 , 768);
    background('blue');
}

function draw() {
  noStroke();

  
  push();
 fill('orange');
  rect(100, 125, 150, 150);
  pop();
  
   push();
   fill('red');
  rect(175, 175,50,50);
  pop();
  
  push()
  noFill();
  strokeWeight(15);
  stroke('grey');
  beginShape(line);
  vertex(0, 0);
  vertex(1024, 0);
  vertex(1024, 768);
  vertex(0, 768);
  endShape(CLOSE);
  pop();
  
}