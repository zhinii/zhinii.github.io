
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});

var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();


//xmotor

objloader.load('objmodels/xmotor.obj', function(object){      //*******change location
    scene.add(object);

});

//xbelt

objloader.load('objmodels/xbelt.obj', function(object){      //*******change location
    scene.add(object);
});

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

//honeycomb

objloader.load('objmodels/honeycomb.obj', function(object){      //*******change location
    scene.add(object);

});

//mirror

objloader.load('objmodels/mirror.obj', function(object){      //*******change location
    scene.add(object);

});



//carriage

objloader.load('objmodels/carriage.obj', function(object){      //*******change location
    scene.add(object);

});

//controlpad

objloader.load('objmodels/controlpad.obj', function(object){      //*******change location
    scene.add(object);
});

//lensmirror

objloader.load('objmodels/lensmirror.obj', function(object){      //*******change location
    scene.add(object);
});
