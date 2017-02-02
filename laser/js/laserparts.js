//zaxis parts

var Zpulley = new THREE.MTLLoader();
			
			lasermodelSolid.load('models/Zpulley.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/Zpulley.obj', function(object){
					scene.add(object);
				
				});
				
			});


var Zbelt = new THREE.MTLLoader();
			
			lasermodelSolid.load('models/Zbelt.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/Zbelt.obj', function(object){
					scene.add(object);
				
				});
				
			});


var Zscrew = new THREE.MTLLoader();
			
			lasermodelSolid.load('models/Zscrew.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/Zscrew.obj', function(object){
					scene.add(object);
				
				});
				
			});

	var Zparts = [Zscrew, Zpulley, Zbelt];



var zClick = document.getElementById('zscrews');
zClick.addEventListener('mouseon', zHover);

function zHover(){
	console.log('hi');
}
