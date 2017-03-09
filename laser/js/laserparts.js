
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');
var loader = new THREE.STLLoader();

console.log(menuClick);

//zbelt 
loader.load('models/zBelts.stl', function(object) {      //file location
    //create mesh from file and color var
  			var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing1 = document.getElementById('zbelt');         //get id of associate menu item
    menuClick.addEventListener('click', function() {       //add event listener
        if (event.target == thing1) { console.log('click1');
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//zmotor
loader.load('models/zMotor.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing2 = document.getElementById('zmotor');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {         //add event listener
        if (event.target == thing2) {console.log('click2');
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//zscrews
loader.load('models/zScrew.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing3 = document.getElementById('zscrews');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {       //add event listener
        if (event.target == thing3) {console.log('click3');  
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});



//xmotor
loader.load('models/xMotor.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing4 = document.getElementById('xmotor');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing4) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});

//xbelt 
loader.load('models/xBelt.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing5 = document.getElementById('xbelt');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing5) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});

//xrail 
loader.load('models/xRail.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing6 = document.getElementById('xrails');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing6) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//xmirror 
loader.load('models/xMirror.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing7 = document.getElementById('xmirror');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing7) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//ymotor
loader.load('models/yMotor.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing8 = document.getElementById('ymotor');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing8) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//ybelt 
loader.load('models/yBelts.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing9 = document.getElementById('ybelt');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing9) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//yrails 
loader.load('models/yRails.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing10 = document.getElementById('yrails');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing10) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});

//lens
loader.load('models/lensMirror.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing11 = document.getElementById('lens');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing11) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//bedrulers
loader.load('models/rulers.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing12 = document.getElementById('bedrulers');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing12) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//honeycomb
loader.load('models/honeycomb.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing12 = document.getElementById('bedhoneycomb');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing12) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});

//platform
loader.load('models/bedPlatform.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing13 = document.getElementById('platform');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing13) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
//bed
loader.load('models/bed.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing14 = document.getElementById('bed');         //*****get id of associate menu item
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target == thing14) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});
