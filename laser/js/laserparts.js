
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');
var loader = new THREE.STLLoader();
var loader2 = new THREE.STLLoader();



//zbelt 
loader.load('models/zBelts.stl', function(zBeltObj) {      //file location
    //create mesh from file and color var
  			var zBeltMesh = new THREE.Mesh(zBeltObj, meshBaseColor);
                    //rotate mesh
  zBeltMesh.rotateX( -Math.PI / 2 );
    scene.add(zBeltMesh);

  
    document.addEventListener('click', function() {        //add event listener
        if (event.target.id == 'zbelt') {
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
