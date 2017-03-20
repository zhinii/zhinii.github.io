function myFunction(event) { 
    alert(event.target.id);
}


var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');
var loader = new THREE.STLLoader();
var loader2 = new THREE.STLLoader();

console.log(menuClick);

//zbelt 
loader.load('models/zBelts.stl', function(zBeltObj) {      //file location
    //create mesh from file and color var
  			var zBeltMesh = new THREE.Mesh(zBeltObj, meshBaseColor);
                    //rotate mesh
  zBeltMesh.rotateX( -Math.PI / 2 );
    scene.add(zBeltMesh);

  var thing1 = document.getElementById('zbelt');         //get id of associate menu item
    document.addEventListener('click', function() {        //add event listener
        if (event.target == thing1) {
          
                   zBeltMesh.material.color.setHex(0xff0000);   //change color of selected object
                    zBeltMesh.material.opacity = 1;
                    zBeltMesh.material.transparent = true;
                
            }
        else {
                    zBeltMesh.material.color.setHex(0xffffff);  //change color if not selected
                    zBeltMesh.material.opacity = .4;
                   zBeltMesh.material.transparent = true;
          
        }
    });
});
//zmotor
loader2.load('models/zMotor.stl', function(object) {      //******file location
    //create mesh from file and color var
            var mesh = new THREE.Mesh(object, meshBaseColor);
                    //rotate mesh
  mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);


    var thing2 = document.getElementById('zmotor');         //*****get id of associate menu item
    document.addEventListener('click', function() {    
         if (event.target == thing2){//add event listener
                    mesh.material.color.setHex(0xff0000);   //change color of selected object
                    mesh.material.opacity = 1;
                    mesh.material.transparent = true;
                }  
        else {
                    mesh.material.color.setHex(0xffffff);  //change color if not selected
                    mesh.material.opacity = .4;
                    mesh.material.transparent = true;
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


