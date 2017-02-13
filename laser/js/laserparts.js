
var baseColor = 0xffffff;

var partHilite = ['#motor', '#zbelt', '#zscrews'];
	

	
//zaxis parts

var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object){

	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (baseColor);
    });
	scene.add(object);

		partHilite.addEventListener('click', function(){
			for(var i = 0; i < partHilite.length; i++)
			{
				if (partHilite[i] = '#zbelt'){
				object.traverse(function(child){	
					if(child.material){
					child.material.color.setHex(0xff0000);
										}
							}

	});
	}
		else{
			object.traverse(function(child){
			if(child.material){
				child.material.color.setHex(0xffffff);
			}
		});
		}
});

});

