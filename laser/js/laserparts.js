
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');

var objloader = new THREE.OBJLoader();
var stlloader = new THREE.STLLoader();

console.log(menuClick);

//zbelt

stlloader.load('models/zBelts.stl', function(object){
        var mesh = new THREE.Mesh(object, meshBaseColor);
    mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);
      

menuClick.addEventListener('click', function(){
if (event.target.id === 'zbelt'){
            mesh.traverse(function(child) {
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


//zmotor

stlloader.load('models/zMotor.stl', function(object){
        var mesh = new THREE.Mesh(object, meshBaseColor);
      mesh.rotateX( -Math.PI / 2 );
    scene.add(mesh);
    

menuClick.addEventListener('click', function(){
if (event.target.id === 'zmotor'){
            mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);   //change color of selected object
                    child.material.opacity = 1;
                    child.material.transparent = true;
                }
            });
        }
else{
           mesh.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);  //change color if not selected
                    child.material.opacity = .7;
                    child.material.transparent = true;
                }
            });
        }
});
});
