
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

  
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target.id === 'zbelt') {
          console.log(event.target.id);
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
loader2.load('models/zMotor.stl', function(zMotorObj) {      //file location cahnge this line
    //create mesh from file and color var
            var zMotorMesh = new THREE.Mesh(zMotorObj, meshBaseColor); ///cahnge this line
                    //rotate mesh
  zMotorMesh.rotateX( -Math.PI / 2 );
    scene.add(zMotorMesh);    /////////change this line

  
    menuClick.addEventListener('click', function() {        //add event listener
        if (event.target.id === 'zmotor') {
          console.log(event.target.id);
                   zMotorMesh.material.color.setHex(0xff0000);   //change color of selected object
                    zMotorMesh.material.opacity = 1;
                    zMotorMesh.material.transparent = true;
                
            }
        else {
                    zMotorMesh.material.color.setHex(0xffffff);  //change color if not selected
                    zMotorMesh.material.opacity = .4;
                   zMotorMesh.material.transparent = true;
          
        }
    });
});

