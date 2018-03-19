var clickToHide = document.getElementsByClassName('accordion');
for(var i = 0; i <clickToHide.length; i++){
clickToHide[i].addEventListener('click', function(){
	console.log(i);
});
}





var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setClearColor( 0xCCCCCC );
  camera.position.z = 20;
      camera.position.y = 70;
  	    camera.position.x = 0;
    renderer.setSize(window.innerWidth-10, window.innerHeight-10);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "context"
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));
    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);
			
			var lasermodelClear = new THREE.MTLLoader();
			
		lasermodelClear.load('models/plsClear.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/plsClear.obj', function(object){
					scene.add(object);
for(var i = 0; i <clickToHide.length; i++){
			clickToHide[i].addEventListener('click', function(){
	object.visible = false;

});
}				
				});
				
			});

			var lasermodelWire = new THREE.MTLLoader();
			
		lasermodelWire.load('models/wireframe.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/wireframe.obj', function(object){
					scene.add(object);
					object.visible = false;

for(var i = 0; i <clickToHide.length; i++){
			clickToHide[i].addEventListener('click', function(){
					object.visible = true;

});
}				
				});
				
			});


		var lasermodelSolid = new THREE.MTLLoader();
			
			lasermodelSolid.load('models/plsSolid.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/plsSolid.obj', function(object){
					scene.add(object);
				
				});
				
			});


	
		
			
			  var render = function() {
	    
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update();
    };
    ///scene controls for mouse
    controls = new THREE.OrbitControls(camera, renderer.domElement);
	    controls.target.set( 0,30,0 );
    render();
    //end of controls


       //thoughts to draw on scene
       // capture scene as image and draw to canvas
       //draw on canvas with pen
       //save drawn on image as download
       //to view in 3d, clear canvas


       ///below is 2d canvas
        //assign canvas to var
//                 var canvas = document.getElementById('artboard');
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
//                 //create drawing elements in canvas i.e. line color, width
//                 canvas.style.display = 'none';
//                 var ctx = canvas.getContext('2d');
//                 ctx.strokeStyle = '#ff6600';
//                 ctx.lineWidth = 2;
//                 // var for mouse down or up
//                 var isMousedown = false;
//                 //empty var for point location
//                 var lastPoint = {
//                     x: null,
//                     y: null
//                 };
//                 //create eventlistener for mousdown and tracks the coordinates of this event
//                 canvas.addEventListener('mousedown', function(event) {
//                     isMousedown = true;
//                     lastPoint.x = event.x;
//                     lastPoint.y = event.y;
//                 });
//                 //event listener for mouse up
//                 canvas.addEventListener('mouseup', function() {
//                     isMousedown = false;
//                 });
//                 //event listener for mouse move and drawing on the move
//                 canvas.addEventListener('mousemove', function(event) {
//                     //if mousdown is true
//                     if (isMousedown) {
//                         console.log(event.x, event.y);
//                         //use those coordinate to draw a line
//                         ctx.beginPath();
//                         ctx.moveTo(lastPoint.x, lastPoint.y);
//                         ctx.lineTo(event.x, event.y);
//                         ctx.closePath();
//                         ctx.stroke();
//                         //create and place coordinate of each 'stroke'
//                         lastPoint.x = event.x;
//                         lastPoint.y = event.y;
//                     }
//                 });

//        var draw = document.getElementById('draw2d');
//        var nav = document.getElementById('view3d');

//        draw.addEventListener('click', function(){

//                  ctx.clearRect(0, 0, canvas.width, canvas.height);
//                   	  render();
//         canvas.style.display = 'block';
//          // render();
//        });

//        nav.addEventListener('click', function(){
//         canvas.style.display = 'none';
//         console.log('hide');
//        });


