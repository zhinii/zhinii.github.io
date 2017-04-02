//drop zone taken from drag/drop video of dan shiffman in week 9
var dropzone;
var canvas; 

function setup() {
   canvas = createCanvas(200, 200);
    background('yellow');
    //create slider
    slider1 = createSlider(0, 100, 100);
    slider1.position (displayWidth/4, 10);
//select dropzone
  dropzone = select('#dropzone');
  //function for dragover and dragout
  dropzone.dragOver(highlight);
    dropzone.dragLeave(unhighlight);

    // drop event for dragzone
    dropzone.drop(gotFile, unhighlight);

    //create image from the dropped image and place into canvas background
function gotFile(file){
	var img = createImg(file.data);
	var bg = image(img, 0, 0, 200, 200)
	background(bg);
}
}


//change color
function highlight(){
	dropzone.style('background-color', 'red');
}
//change color
function unhighlight(){
	dropzone.style('background-color', 'white');
}


function draw() {
	//create paragraph with text
var para =  createP('im a slider');
//position paragraph
para.position(displayWidth/4, 10);
   //style paragraph text color
para.style('color', 'blue');


}
