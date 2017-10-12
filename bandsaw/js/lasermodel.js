





var scene = new THREE.Scene();
//set scene width and height var
var sceneWidth = 600;
var sceneHeight = 900
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
			
      var objloader = new THREE.OBJLoader();

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

//load obj with no mtl and material is default

objloader.load('models/blade.obj', function(object){  
  // //set material
  //   object.traverse( function ( child ) {
  //       if ( child instanceof THREE.Mesh ) {
  //             child.material.color.setHex(0xff0000);
  //           // child.material = material;
  //       }
  //   });
      //change location
    scene.add(object);
     // //push object to array
     //      stuff.push(object);
});

objloader.load('models/cover.obj', function(object){  
  //set material
    // object.traverse( function ( child ) {
    //     if ( child instanceof THREE.Mesh ) {
    //           child.material.color.setHex(0xff0000);
    //         // child.material = material;
    //     }
    // });
      //change location
    scene.add(object);
     // //push object to array
     //      stuff.push(object);
});


objloader.load('models/deck.obj', function(object){  
  // //set material
  //   object.traverse( function ( child ) {
  //       if ( child instanceof THREE.Mesh ) {
  //             child.material.color.setHex(0xff0000);
  //           // child.material = material;
  //       }
  //   });
      //change location
    scene.add(object);
     // //push object to array
     //      stuff.push(object);
});

objloader.load('models/guard.obj', function(object){  
  // //set material
  //   object.traverse( function ( child ) {
  //       if ( child instanceof THREE.Mesh ) {
  //             child.material.color.setHex(0xff0000);
  //           // child.material = material;
  //       }
  //   });
      //change location
    scene.add(object);
     // //push object to array
     //      stuff.push(object);
});

objloader.load('models/guide.obj', function(object){  
  // //set material
  //   object.traverse( function ( child ) {
  //       if ( child instanceof THREE.Mesh ) {
  //             child.material.color.setHex(0xff0000);
  //           // child.material = material;
  //       }
  //   });
      //change location
    scene.add(object);
     //push object to array
          // stuff.push(object);
});

objloader.load('models/mirrorTwo.obj', function(object){  
  //set material
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
              child.material.color.setHex(0xff0000);
            // child.material = material;
        }
    });
      //change location
    scene.add(object);
     //push object to array
          stuff.push(object);
          mirror.push(object);
});

objloader.load('models/mirrorLens.obj', function(object){  
  //set material
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
              child.material.color.setHex(0xff0000);
            // child.material = material;
        }
    });
      //change location
    scene.add(object);
     //push object to array
          stuff.push(object);
          lens.push(object);
});
//ray casting with mouse picking objects

   var baseColor = 0xff0000;
    var intersectColor = 0x00D66B;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersected;
    //an array for raycasting, push objects into it. we will call array later
    //array for all raycasting color change, each object goes in here
    var stuff = [];
    //array for raycast clicking, each object gets its own array
    var lens = [];
    var mirror = [];
    console.log(stuff);

    //below is raycaster for mouse move intersections, second raycaster function is needed for click events
     function onDocumentMouseMove(event) { // This is a function to run when we click; we get information about the event through the `event` parameter
        
        // Set the x and y coordinates of our mouse vector to our pointer position, scaling for the width and height of our renderer (400 and 300, respectively)
        var offsetX = renderer.domElement.offsetLeft*(2/sceneWidth);
        var offsetY = renderer.domElement.offsetTop*(2/sceneHeight);
        mouse.x = (event.clientX / sceneWidth) * 2 - 1 - offsetX;
        mouse.y = -(event.clientY / sceneHeight) * 2 + 1 +offsetY;
        
        // Tell our raycaster to cast from our mouse
        raycaster.setFromCamera(mouse, camera);
        
        // Tell our raycaster to detect the intersection with that array of objects
        var intersections = raycaster.intersectObjects(stuff, true);
        if (intersections.length > 0) { 
        // If we find any intersections
          // Do stuff  
          if (intersected != intersections[0].object) {
                if (intersected) intersected.material.color.setHex(baseColor);
                intersected = intersections[0].object;
                intersected.material.color.setHex(intersectColor);
            }
            document.body.style.cursor = 'pointer';
        } else if (intersected) {
            intersected.material.color.setHex(baseColor);
            intersected = null;
            document.body.style.cursor = 'auto';
        }
   
        };

        //attaches event listender to the renderer, which is a dom element. so when a mouse moves it is listening and executing our function for raycasting
	 renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);

   //raycasting function for click events
    function onDocumentClick(event) { 
                var offsetX = renderer.domElement.offsetLeft * (2 / sceneWidth);
                var offsetY = renderer.domElement.offsetTop * (2 / sceneHeight);
                mouse.x = (event.clientX / sceneWidth) * 2 - 1 - offsetX;
                mouse.y = -(event.clientY / sceneHeight) * 2 + 1 + offsetY;
                
                // Tell our raycaster to cast from our mouse
                raycaster.setFromCamera(mouse, camera);
                
                var intersections1 = raycaster.intersectObjects(mirror, true );
                if (intersections1.length > 0) { // If we find any intersections
                    document.getElementById("mirrorBezel").style.visibility = "visible";
                    console.log("Clicked");
                } else {document.getElementById("mirrorBezel").style.visibility = "hidden";}

                var intersections2 = raycaster.intersectObjects(lens, true );
                if (intersections2.length > 0) { // If we find any intersections
                    document.getElementById("mirrorLens").style.visibility = "visible";
                    console.log("Clicked");
                } else {document.getElementById("mirrorLens").style.visibility = "hidden";}

             };
            
             // And then actually attach our onDocumentClick function as an event handler to when the canvas hears a `click`
             renderer.domElement.addEventListener('click', onDocumentClick, false);
		
			
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


