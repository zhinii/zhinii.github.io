
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');
var loader = new THREE.STLLoader();
//zbelt 
loader.load('models/zBelts.stl', function(object) {      //file location
  			var mesh = new THREE.mesh(object, meshBaseColor);
    scene.add(mesh);
}

    var thing = document.getElementById('zbelt');         //get id of associate menu item
    menuClick.addEventListener('click', function() {
        if (event.target == thing) {
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.MeshClickColor;
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        } else {
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.meshBaseColor;
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
    });
});






// var baseColor = 0xffffff;
// var menuClick = document.getElementById('menu');
// var loader = new THREE.STLLoader();
// //zbelt 
// loader.load('models/zBelts.stl', function(object) {      //file location
//     object.traverse(function(child) {
//         if (child instanceof THREE.Mesh)
//             child.material.color.setHex(baseColor);
//     });
//     scene.add(object);

//     var thing = document.getElementById('zbelt');         //get id of associate menu item
//     menuClick.addEventListener('click', function() {
//         if (event.target == thing) {
//             object.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xff0000);
//                     child.material.opacity = 1;
//                     child.material.transparent = true;
//                 }
//             });
//         } else {
//             object.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xffffff);
//                     child.material.opacity = .4;
//                     child.material.transparent = true;
//                 }
//             });
//         }
//     });
// });

// //zmotor
// loader.load('models/zMotor.stl', function(object) {      //file location
//     object.traverse(function(child) {
//         if (child instanceof THREE.Mesh)
//             child.material.color.setHex(baseColor);
//     });
//     scene.add(object);

//     var thing = document.getElementById('zmotor');         //get id of associate menu item
//     menuClick.addEventListener('click', function() {
//         if (event.target == thing) {
//             object.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xff0000);
//                      child.material.opacity = 1;
//                     child.material.transparent = true;
//                 }
//             });
//         } else {
//             object.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xffffff);
//                     child.material.opacity = .4;
//                     child.material.transparent = true;
//                 }
//             });
//         }
//     });
// });

// //zpulley
// loader.load('models/zScrew.stl', function(object) {      //file location
//     object.traverse(function(child) {
//         if (child instanceof THREE.Mesh)
//             child.material.color.setHex(baseColor);
//     });
//     scene.add(object);

//     var thing = document.getElementById('zscrews');         //get id of associate menu item
//     menuClick.addEventListener('click', function() {
//         if (event.target == thing) {
//             object.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xff0000);
//                     child.material.opacity = 1;
//                     child.material.transparent = true;
//                 }
//             });
//         } else {
//             object.traverse(function(child) {
//                 if (child.material) {
//                     child.material.color.setHex(0xffffff);
//                     child.material.opacity = .4;
//                     child.material.transparent = true;
//                 }
//             });
//         }
//     });
// });
