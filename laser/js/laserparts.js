var intersectColor = 0xff0000;
	var Zparts = [];
//zaxis parts
var material = new THREE.MeshLambertMaterial({
	color: 0xffffff
});

var loader = new THREE.STLLoader();

loader.load('./models/zbelt.stl', function(geometry){
	scene.add(new THREE.Mesh(geometry)):
});

loader.load('./models/zmotor.stl', function(geometry){
	scene.add(new THREE.Mesh(geometry)):
});

loader.load('./models/zscrew.stl', function(geometry){
	scene.add(new THREE.Mesh(geometry)):
});

// var zClick = document.getElementById('zscrews');
// zClick.addEventListener('mouseover', zHover);

// function zHover(){
// 	console.log('ok');
// 	Zparts[0].material.color.setHex(0xff0000);
// }

