
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');
var loader = new THREE.STLLoader();

console.log(menuClick);

//zbelt 
loader.load('models/zBelts.stl', function(zBeltObj) {      //file location
    //create mesh from file and color var
  			var zBeltMesh = new THREE.Mesh(zBeltObj, meshBaseColor);
                    //rotate mesh
  zBeltMesh.rotateX( -Math.PI / 2 );
    scene.add(zBeltMesh);


    var thing1 = document.getElementById('zbelt');         //get id of associate menu item
    menuClick.addEventListener('click', function() {       //add event listener
        if (event.target == thing1) { console.log('click1');
            zBeltMesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected 
                    
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
           zBeltMesh.traverse(function(child) {
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
// //zscrews
// loader.load('models/zScrew.stl', function(object) {      //******file location
//     //create mesh from file and color var
//             var mesh = new THREE.Mesh(object, meshBaseColor);
//                     //rotate mesh
//   mesh.rotateX( -Math.PI / 2 );
//     scene.add(mesh);


//     var thing3 = document.getElementById('zscrews');         //*****get id of associate menu item
//     menuClick.addEventListener('click', function() {       //add event listener
//         if (event.target == thing3) {console.log('click3');  
//             mesh.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xff0000);   //change color of selected object
//                     child.material.opacity = 1;
//                     child.material.transparent = true;
//                 }
//             });
//         } else {
//            mesh.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xffffff);  //change color if not selected
//                     child.material.opacity = .4;
//                     child.material.transparent = true;
//                 }
//             });
//         }
//     });
// });


