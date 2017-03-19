
var z = 0;
var cs = 0;
var hr = 0;

function setup() {
    createCanvas(displayWidth/2, displayHeight/2);
    
}

function draw() {
  //get time
  var s = second();
   var h = hour();
   var m = minute();
   console.log(h);
//use seconds to change the grey value of background 
  z = s*4.25
    background(z);
//use the minutes to change size of ellipse
cs = m*10
ellipse(width/2, height/2, 10+cs, 10+cs);
fill('orange');

//
hr = h*.261799387;
console.log(hr);
push();
noFill();
stroke('red');
arc(width/2, height/2, 221, 221, 0, TWO_PI-hr,PIE);
pop();




}

