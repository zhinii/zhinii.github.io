
var baseColor = 0xffffff;

var hilite = ['#motor', '#zbelt', '#zscrews'];

for(var i=0; i <hilite.length; i++){
hilite.addEventListener('click', function(){
	console.log('hi');
});
}



	
//zaxis parts

var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object){

	object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh )
            child.material.color.setHex (baseColor);
    });
	scene.add(object);

// for(var i=0; i< partHilite.length; i++) {
//        partHilite[i].addEventListener("click", function(){
// 			if (bindClick[i] = '#zbelt')
// 				{object.traverse(function(child)
// 					{if(child.material)
// 						{child.material.color.setHex(0xff0000);}
// 							});
// 			}
// 			else{
// 			object.traverse(function(child){
// 			if(child.material){
// 				child.material.color.setHex(0xffffff);
// 			}
// 		});
// 		}
// 	});
// 			
		
// }
});




