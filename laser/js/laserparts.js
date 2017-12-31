
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});

   var baseColor = 0xff0000;
    var intersectColor = 0x00D66B;

var menuClick = document.getElementById('menu');

var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();

console.log(menuClick);

//zbelt

objloader.load('objmodels/zbelt.obj', function(object){
    scene.add(object);
    stuff.push(object);
});


//zmotor

objloader.load('objmodels/zmotor.obj', function(object){
    scene.add(object);
    stuff.push(object);
});


//zscrew

objloader.load('objmodels/zscrew.obj', function(object){      //change location
    scene.add(object);
    stuff.push(object);
});



//xmotor

objloader.load('objmodels/xmotor.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//xbelt

objloader.load('objmodels/xbelt.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//xrail

objloader.load('objmodels/xrail.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//ymotor

objloader.load('objmodels/ymotor.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//yrails

objloader.load('objmodels/yrail.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);

});

//ybelt

objloader.load('objmodels/ybelt.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});


//rulers

objloader.load('objmodels/rulers.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//platform

objloader.load('objmodels/platform.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//honeycomb

objloader.load('objmodels/honeycomb.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//mirror

objloader.load('objmodels/mirror.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//lens

objloader.load('objmodels/lensmirror.obj', function(object){      //*******change location
    scene.add(object);

});

//carriage

objloader.load('objmodels/carriage.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

//controlpad

objloader.load('objmodels/controlpad.obj', function(object){      //*******change location
    scene.add(object);
    stuff.push(object);
});

var stuff = [];


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
