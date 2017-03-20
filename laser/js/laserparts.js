
var meshBaseColor = new THREE.MeshLambertMaterial({color: 0xffffff});
var MeshClickColor = new THREE.MeshLambertMaterial({color: 0xff0000});
var menuClick = document.getElementById('menu');

var objloader = new THREE.OBJLoader();

console.log(menuClick);

//zbelt

objloader.load('objmodels/zbelt.obj', function(object){
    scene.add(object);

menuClick.addEventListener('click', function(){
if (event.target.id === 'zbelt'){
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
                    child.material.opacity = .4;
                    child.material.transparent = true;
                }
            });
        }
});
});
