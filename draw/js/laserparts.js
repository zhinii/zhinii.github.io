

var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});

var baseColor = 0xff0000;
var intersectColor = 0x00D66B;
var sceneWidth = window.innerWidth-10;
var sceneHeight = window.innerHeight-10;

var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();



objloader.load('models/zbelt.obj', function(object){
    scene.add(object);
    stuff.push(object);
});


//zmotor

objloader.load('models/zmotor.obj', function(object){
    scene.add(object);
    stuff.push(object);
});


//zscrew

objloader.load('models/zscrew.obj', function(object){      //change location
    scene.add(object);
    stuff.push(object);
});



//xmotor

objloader.load('models/xmotor.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//xbelt

objloader.load('models/xbelt.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//xrail

objloader.load('models/xrail.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//ymotor

objloader.load('models/ymotor.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//yrails

objloader.load('models/yrail.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);

});

//ybelt

objloader.load('models/ybelt.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});


//rulers

objloader.load('models/rulers.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//platform

objloader.load('models/platform.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//honeycomb

objloader.load('models/honeycomb.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//mirror

objloader.load('models/mirror.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
    
});

//lens

objloader.load('models/lensmirror.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
  

});

//carriage

objloader.load('models/carriage.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//controlpad

objloader.load('models/controlpad.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});


var stuff = [];
   var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var intersected;

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
                if (intersected) intersected.material.color.setHex(intersected.currentHex);
                intersected = intersections[0].object;
                intersected.currentHex = intersected.material.color.getHex();
                intersected.material.color.setHex(intersectColor);
            }
            document.body.style.cursor = 'pointer';
        } else if (intersected) {
            intersected.material.color.setHex(intersected.currentHex);
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

                var intersections = raycaster.intersectObjects(motorZ, true);//change out STUFF with array of object
                if (intersections.length > 0){
                  document.getElementById('motorZ').style.visibility = 'visible';
                }
                else{
                     document.getElementById('motorZ').style.visibility = 'hidden';
                }

                 var intersections1 = raycaster.intersectObjects(motorX, true);//change out STUFF with array of object
                if (intersections1.length > 0){
                  document.getElementById('motorX').style.visibility = 'visible';
                }
                else{
                     document.getElementById('motorX').style.visibility = 'hidden';
                }

                   var intersections2 = raycaster.intersectObjects(mirrorLeft, true);//change out STUFF with array of object
                if (intersections2.length > 0){
                  document.getElementById('mirrorLeft').style.visibility = 'visible';
                }
                else{
                     document.getElementById('mirrorLeft').style.visibility = 'hidden';
                }
                
                   var intersections3 = raycaster.intersectObjects(mirrorLens, true);//change out STUFF with array of object
                if (intersections3.length > 0){
                  document.getElementById('mirrorLens').style.visibility = 'visible';
                }
                else{
                     document.getElementById('mirrorLens').style.visibility = 'hidden';
                }
                
               
             };
            
             // And then actually attach our onDocumentClick function as an event handler to when the canvas hears a `click`
             renderer.domElement.addEventListener('click', onDocumentClick, false);
        
