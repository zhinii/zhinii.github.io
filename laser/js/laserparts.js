var intersectColor = 0xff0000;
	var Zparts = [];
//zaxis parts
var red = new THREE.MeshLambertMaterial({
	color: 0xff0000
});

var loader = new THREE.OBJLoader();

loader.material.color.setHex(0xff0000);

loader.load('models/Zbelt.obj', function(object){
	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (0xff0000);
    });
	scene.add(object);
});



// var zClick = document.getElementById('zscrews');
// zClick.addEventListener('mouseover', zHover);

// function zHover(){
// 	console.log('ok');
// 	Zparts[0].material.color.setHex(0xff0000);
// }

