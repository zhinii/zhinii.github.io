//drop zone taken from drag/drop video of dan shiffman in week 9
var img;
var canvas;
 var sliderR;
  var sliderG;
   var sliderB;
function setup() {
    canvas = createCanvas(400, 400);
    background('yellow');
    
    // drop event for canvas
    canvas.drop(gotFile);
      
  console.log(pixels);
    // MOVED your draw stuff here.
    //create paragraph with text
    var paraR = createP('adjust red values');
    var paraG = createP('adjust green values');
    var paraB = createP('adjust blue values');
    //position paragraph
    paraR.position(425, 10);
    paraG.position(425, 40);
    paraB.position(425, 70);

    //create slider
   sliderR = createSlider(0, 255, 255);
    sliderR.position(425, 10);
   sliderG = createSlider(0, 255, 255);
    sliderG.position(425, 40);
   sliderB = createSlider(0, 255, 255);
    sliderB.position(425, 70);

    //create save button and mousepress to activate savecancas function
    var button = createButton('click to save canvas as image');
    button.position(0, 410);
    button.mousePressed(saveC);

   

}
//save canvas function
function saveC(){
     saveCanvas('myCanvas', 'jpg');
}

//create image from the dropped image and place into canvas background and load pixels
function gotFile(file) {
img = createImg(file.data).hide();
    image(img, 0, 0, 400, 400);
   
redraw();
}




function draw() {

    // don't create DOM elements here!
    // this is a loop, you'll create a million DOM elements
  
 
 noLoop();
   loadPixels();
 console.log(pixels);
 sliderR.value(0);
  sliderG.value(0);
   sliderB.value(0);


     var r = sliderR.value();
    var g = sliderG.value();
    var b = sliderB.value();
    console.log(r, g, b);

}