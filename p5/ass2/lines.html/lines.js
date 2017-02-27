// reference http://p5ide.herokuapp.com/editor#?sketch=58b25b08939ebe040048d72a

///create canvas
function setup() {
  createCanvas(400, 200);
}


//set var for mouse clicks
var click = 0;


//mouseclick function
function mousePressed() {
 //track our clicks
  click++;
  console.log(click);
  //create var to contain lines drawn
var linesDrawn = 0;
//for loop for horizontal data

    for (var x= 10; x <= width-20; x+= 30){

//foor loop for vertical data
    	for (var y=20; y <= height-10; y+=11){ 	
    	
 //if statement to draw lines
    	if(linesDrawn < click){
    	line(y, x, y, x+20);
   strokeWeight(3);
   linesDrawn++;
 
    }
    
}   
    } 
}
//function to clear canvas and reset click counter
function keyPressed(){
	clear();
	click = 0;
}