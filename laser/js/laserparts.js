
var baseColor = 0xffffff;

var partHilite = ['#motor', '#zbelt', '#zscrews'];

for(var i=0; i< partHilite.length; i++) {
       partHilite[i].addEventListener("click", bindClick(i));
 }

 function bindClick(i) {
    return function(){
             console.log("you clicked region number " + i);
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




