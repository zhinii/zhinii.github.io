
var baseColor = 0xffffff;




	
//zaxis parts

var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object){

	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (baseColor);
    });
	scene.add(object);



var thing = document.getElementById('zbelt');

document.addEventListener('click', function(){
	if(event.target == thing){
	
			object.traverse(function(child)
					{if(child.material)
						{child.material.color.setHex(0xff0000);}
							});
	}
	else(event.target != thing){
		object.traverse(function(child){
			if(child.material){
				child.material.color.setHex(0xffffff);
	}
});
	}
});


});




