// reference http://p5ide.herokuapp.com/editor#?sketch=58b25b08939ebe040048d72a
// http://codepen.io/edhebert/pen/NpbMyz?editors=0011
//second reference was given as response to question.

///create canvas
function setup() {
    createCanvas(innerWidth/4, innerHeight);
    strokeWeight(3);
}

//set var for mouse clicks
var click = 0;

//mouseclick function
function mousePressed() {
    //track our clicks
    click++;

    //create var to contain lines drawn
    var linesDrawn = 0;
    //for loop for row specs

    //count clicks and divide by 5. remainder is used to draw either straight line or diagnol line

    for (var y = 10; y <= height - 10; y = y + 20) {

        //foor loop for column specs
        for (var x = 10; x <= width - 10; x = x + 10) {

            // draw lines if we're not at click total
            if (linesDrawn < click) {
                // increment lines drawn counter
                linesDrawn++;

                // if we're drawing the fifth line 
                if (linesDrawn % 5 == 0) {
                    // draw diagonal tally mark
                    line(x - 50, y, x, y + 10);
                } else {
                    // draw vertical tally mark
                    line(x, y, x, y + 10);
                }
            }

        }

    }
}

//function to clear canvas and reset click counter
function keyPressed() {
    clear();
    click = 0;
}