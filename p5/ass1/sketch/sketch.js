/////Josef Albers
///Homage to the Square: Against Deep Blue
function setup() {

  //set canvas size
    createCanvas(1024 , 768);
    //set bg color
    background('blue');
    //create circle embedded in background
    fill('black');
    ellipse(1024/2, 768/2, 600, 600)
}

//mouse click event that clears background and changes its color
function mousePressed(){
  clear();

    background('blue');
//changes the black circle in the background to multiple black circles arrayed accross canvas
for(var x = 0; x<1024; x = x+100){
  ellipse(x, 768/2, 100, 100);
}
}

//draw objects


function draw() {
  noStroke();
// var to store mouse position
var xcoord = mouseX;
var ycoord = mouseY;
//draw of first square
  push();
  //mouse position determines color using if else statement
  if(mouseX < 500 ){
 fill('orange');}
 else{
   fill('red')
 }
 //mouse position determines rect position
  rect(xcoord, ycoord, 150, 150);
  pop();
  //code from above is repeated for for a smaller rectangle
   push();
    if(mouseX < 500 ){
 fill('red');}
 else{
   fill('orange');
 }
  rect(xcoord + 50, ycoord + 25,50,50);
  pop();

  //these create a grey border around the canvas.

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