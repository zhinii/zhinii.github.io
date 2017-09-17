





var scene = new THREE.Scene();
//set scene width and height var
var sceneWidth = 600;
var sceneHeight = 400
//set camera 
    var camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 500);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    //sets scene background color
renderer.setClearColor( 0xCCCCCC );
//i think this sets camera position, but with orbit controls its funky
  camera.position.z = 20;
      camera.position.y = 70;
  	    camera.position.x = 0;
    renderer.setSize(sceneWidth, sceneHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "context"
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));
    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);
			

//load obj with mtl file
		var lasermodelSolid = new THREE.MTLLoader();
						lasermodelSolid.load('models/chassis.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/chassis.obj', function(object){
					scene.add(object);
				
				});
				
			});

//load obj with no mtl and set material manually

objloader.load('objmodels/zScrew.obj', function(object){      //change location
    scene.add(object);
    object.material.color.setHex(0xffffff);
});


	
		
			
			  var render = function() {
	    
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update();
    };
    ///scene controls for mouse
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //sets where the center point of orbit controls is, this also affects where camera is pointed
	    controls.target.set( 0,30,0 );
    render();
    //end of controls


