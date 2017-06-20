
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});

var objectloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();
var mtlloader = new THREE.MTLLoader();

//xrail
mtlloader.load('objmodels/xrail.mtl',function(material){
material.preload();
var objloader = new THREE.OBJLoader();
objloader.setMaterials(material);
objloader.load('objmodels/xrail.obj', function(object){      //*******change location
    scene.add(object);

});
});

//yrails

objectloader.load('objmodels/yrail.obj', function(object){      //*******change location
    scene.add(object);

});

//ybelt

objectloader.load('objmodels/ybelt.obj', function(object){      //*******change location
    scene.add(object);

});



//platform
mtlloader.load('objmodels/platform.mtl', function(material){
    material.preload();
    var objloader = new THREE.OBJLoader();
    objloader.setMaterials(material);
objloader.load('objmodels/platform.obj', function(object){      //*******change location
    scene.add(object);

});
});




//controlpad
mtlloader.load('objmodels/controlpad.mtl', function(material){
    material.preload();
    var objloader = new THREE.OBJLoader();
    objloader.setMaterials(material);
objloader.load('objmodels/controlpad.obj', function(object){      //*******change location
    scene.add(object);
});
});

