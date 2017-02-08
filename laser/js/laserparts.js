
var baseColor = 0xffffff;

var zClick = document.getElementById('zscrews');
zClick.addEventListener('mouseover', colorChange);
	
var colorChange = function zHover(){
	console.log('ok');
	basecolor = 0xff0000;
}

	
//zaxis parts

var parts = [];
var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object){

	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (baseColor);
    });
	scene.add(object);
	
	zClick.addEventListener('click', function(){
		object.traverse(function(child){
			if(child.material){
				child.material.color.setHex(0xff0000);
			}
		});
});
	
