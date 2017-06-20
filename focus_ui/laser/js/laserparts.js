
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});

var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();


//xrail

objloader.load('objmodels/xrail.obj', function(object){      //*******change location
    scene.add(object);

});


//yrails

objloader.load('objmodels/yrail.obj', function(object){      //*******change location
    scene.add(object);

});

//ybelt

objloader.load('objmodels/ybelt.obj', function(object){      //*******change location
    scene.add(object);

});



//platform

objloader.load('objmodels/platform.obj', function(object){      //*******change location
    scene.add(object);

});






//controlpad

objloader.load('objmodels/controlpad.obj', function(object){      //*******change location
    scene.add(object);
});

