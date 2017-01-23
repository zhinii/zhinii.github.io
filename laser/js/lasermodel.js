 var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
 var controls;
         
 renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "context"
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));
    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);
			
			var lasermodel = new THREE.MTLLoader();
			lasermodel.load('models/pls.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/pls.obj', function(object){
					scene.add(object);

				});
			});


			
			  var render = function() {
	    
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        controls.update();
    };
    ///scene controls for mouse
    controls = new THREE.OrbitControls(camera, renderer.domElement);
	    controls.target.set( 0,100,0 );

    render();
    //end of controls