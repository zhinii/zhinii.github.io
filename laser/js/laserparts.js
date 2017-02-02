var leadscrew = new THREE.MTLLoader();
			
			lasermodelSolid.load('models/leadscrew.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/leadscrew.obj', function(object){
					scene.add(object);
				
				});
				
			});