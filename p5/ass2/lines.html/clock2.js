/// code used and referenced from 2.6

/*
 Simulate clock movement using translate, rotate
*/

// the rotation angle for the hands

var z = 0;
var cs = 0;

function setup() {
    createCanvas(displayWidth/2, displayHeight/2);
    
}

function draw() {
  //get time
  var s = second();
   var h = hour();
   var m = minute();
//use seconds to change the grey value of background 
  z = s*4.25
    background(z);
//use the minutes to change size of ellipse
cs = m*10
ellipse(width/2, height/2, 10+cs, 10+cs);
fill('orange');

//



}

