var scene = new THREE.Scene();

			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );


			var lasermodel = new THREE.MTLLodaer();
			lasermodel.load('models/pls.mtl', function(material)){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/pls.obj', function(object){
					scene.add(object);

				})
			}

			
			camera.position.z = 15;

			var render = function () {
				requestAnimationFrame( render );
				renderer.render(scene, camera);
				controls.update();
			};

			 controls = new THREE.OrbitControls(camera, renderer.domElement);
	    controls.target.set( 0,0,0 );

			render();
