/// code used and referenced from 2.6

/*
 Simulate clock movement using translate, rotate
*/

// the rotation angle for the hands
var theta = 0;
var hr = 0;
var minut = 0;

function setup() {
    createCanvas(displayWidth/2, displayHeight/2);
}

function draw() {
    background(50);

    // save the coordinate space for later
    push();
   

    
      // move the origin to the center of the canvas
      translate(width / 2, height / 2);
      
      // move the hour hand 
      rotate(radians(hr*30));
      rect(-15, -100, 30,120);
    pop();
     var h = hour();
    hr = h-12;
    console.log(h);
    console.log(hr);


       push(); 
      // move the origin BACK to the center of the canvas
      translate(width / 2, height / 2);
     
      // move the minute hand
      
      rotate(radians(minut*6));
      rect(-5, -150, 20, 170);
    pop();
    //minutes
   var m = minute();
    minut = m;
    
    push(); 
      // move the origin BACK to the center of the canvas
      translate(width / 2, height / 2);
     
      // move the minute hand
      
      rotate(radians(theta*6));
      rect(-5, -190, 10, 200);
    pop();
    //seconds    
    var s = second();
    theta = s;


    textSize(20);
  text('.'+theta, 75, 20);
    text(minut , 50, 20);
        text(hr + ':', 30, 20);
        fill('white');




   
}