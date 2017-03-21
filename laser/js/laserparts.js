
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');

var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();

console.log(menuClick);

//zbelt

objloader.load('objmodels/zbelt.obj', function(object){
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'zbelt'){
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    
                }
            });
        }
else{
           object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                 
                }
            });
        }
});
});


//zmotor

objloader.load('objmodels/zmotor.obj', function(object){
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'zmotor'){
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                   
                }
            });
        }
else{
           object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    
                }
            });
        }
});
});


//zscrew

objloader.load('objmodels/zscrew.obj', function(object){      //change location
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'zscrews'){                                        //change id of clicked object
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                   
                }
            });
        }
else{
           object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    
                }
            });
        }
});
});



//xmotor

objloader.load('objmodels/xmotor.obj', function(object){      //*******change location
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'xmotor'){                                        //********change id of clicked object
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        }
else{
           object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .7;
                    child.material.transparent = true;
                }
            });
        }
});
});

//xbelt

objloader.load('objmodels/xbelt.obj', function(object){      //*******change location
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'xbelt'){                                        //********change id of clicked object
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        }
else{
           object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .7;
                    child.material.transparent = true;
                }
            });
        }
});
});

//xrail

objloader.load('objmodels/xrail.obj', function(object){      //*******change location
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'xrails'){                                        //********change id of clicked object
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        }
else{
           object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .7;
                    child.material.transparent = true;
                }
            });
        }
});
});
