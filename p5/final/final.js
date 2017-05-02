//drop zone taken from drag/drop video of dan shiffman in week 9
//code also repurposed from week 11

var canvas;
var sliderR;
var sliderG;
var sliderB;
var r;
var g;
var b;
var mouseDown = false;
var lastPointX;
var lastPointY;

function setup() {
    // deal with issues on retina displays
    pixelDensity(1);
    canvas = createCanvas(400, 400);
    background("yellow");
    strokeWeight(3);
    // drop event for canvas
    canvas.drop(gotFile);

    console.log(pixels);
    // MOVED your draw stuff here.
    //create paragraph with text
    var paraR = createP("adjust red values");
    var paraG = createP("adjust green values");
    var paraB = createP("adjust blue values");
    //position paragraph
    paraR.position(425, 10);
    paraG.position(425, 40);
    paraB.position(425, 70);

    //create slider
    sliderR = createSlider(0, 255, 0);
    sliderR.position(425, 10);
    sliderG = createSlider(0, 255, 0);
    sliderG.position(425, 40);
    sliderB = createSlider(0, 255, 0);
    sliderB.position(425, 70);

    //explanation
     var para1 = createP("Drag image from folder/desktop to yellow box to view on canvas");
      var para2 = createP("Click and drag mouse on canvas to draw");
       var para3 = createP("Use sliders to adjust color values on canvas when image is present");
       para1.position(10, 420);
       para2.position(10, 440);
       para3.position(10, 460);

    //create save button and mousepress to activate savecancas function
    var button = createButton("click to save canvas as image");
    button.position(0, 410);
    button.mousePressed(saveC);
}
//save canvas function
function saveC() {
    saveCanvas("myCanvas", "jpg");
}

//create image from the dropped image and place into canvas background and load pixels
function gotFile(file) {
    img = createImg(file.data).hide();
    image(img, 0, 0, 400, 400);

}
//function to detect if mouse is clicked
  function mousePressed(){
    mouseDown = true;
                    lastPointX = mouseX;
                    lastPointY = mouseY;
                    console.log(lastPointX);
}
//function to detect if mouse is released
function mouseReleased() {
  mouseDown = false;
}


function draw() {


//if mouse is down draw line from where it was to where it is
  if (mouseDown){
    line(lastPointX, lastPointY, mouseX, mouseY);
 }
 lastPointX = mouseX;
 lastPointY = mouseY;

    // don't create DOM elements here!
    // this is a loop, you'll create a million DOM elements

    r = sliderR.value();
    g = sliderG.value();
    b = sliderB.value();

    if (typeof img !== 'undefined') {
        loadPixels();
        var orig = pixels;
        for (var y = 0; y < height; y++) {
            // and each column
            for (var x = 0; x < width; x++) {
                // go through EVERY individual pixel's R, G, B, and A
                var index = (x + y * width) * 4;
                var reds = pixels[index];
                // mess with the RGB values!
                if(sliderR.value() >= 1){
                  pixels[index] =  r ; // red
                }

                 if(sliderG.value() > 0){
                   pixels[index +1] =  g ; // red
                }
                
                 if(sliderB.value() > 0){
                   pixels[index +2] =  g ; // red
                }
            }
        }
        updatePixels();
    }

}

