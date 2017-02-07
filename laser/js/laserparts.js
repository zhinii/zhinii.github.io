
var zClick = document.getElementById('zscrews');
zClick.addEventListener('mouseover', zHover);


var intersectColor = 0xff0000;
	
//zaxis parts

var parts = [];
var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object){
	
function zHover(){
	console.log('ok');
	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (0xff0000);
    });
}


	scene.add(object);
	parts.push(object);
});


