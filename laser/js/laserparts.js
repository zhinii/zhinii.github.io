var intersectColor = 0xff0000;
	var Zparts = [];
//zaxis parts
var red = new THREE.MeshLambertMaterial({
	color: 0xff0000
});
var parts = [];
var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object){
	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (0xffffff);
		parts.push(child);
    });
	scene.add(object);
});



var zClick = document.getElementById('zscrews');
zClick.addEventListener('mouseover', zHover);

function zHover(){
	console.log('ok');
	parts[0].material.color.setHex(0xff0000);
}

