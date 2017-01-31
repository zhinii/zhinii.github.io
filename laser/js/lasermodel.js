var clickToHide = document.getElementsByClassName('accordion');
for(var i = 0; i <clickToHide.length; i++){
clickToHide[i].addEventListener('click', function(){
	console.log('hi');
});
}

var modelHide = function(){
	object.traverse( function( node ) {  
   					 if( node.material ) {
       					 node.material.opacity = 0.5;
       					 node.material.transparent = true;
    					}
					} );
}


var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
  camera.position.z = 20;
      camera.position.y = 70;
  	    camera.position.x = 0;
    renderer.setSize(window.innerWidth-10, window.innerHeight-10);
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = "context"
    scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444));
    var light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);
			
			var lasermodelClear = new THREE.MTLLoader();
			
		lasermodelClear.load('models/plsClear.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/plsClear.obj', function(object){
					scene.add(object);
					for(var i = 0; i <clickToHide.length; i++){
					clickToHide[i].addEventListener('click', modelHide);
					}

					
					
					
					
				});
				
			});


		var lasermodelSolid = new THREE.MTLLoader();
			
			lasermodelSolid.load('models/plsSolid.mtl', function(material){
				material.preload();
				var loader = new THREE.OBJLoader();
				loader.setMaterials(material);
				loader.load('models/plsSolid.obj', function(object){
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
	    controls.target.set( 0,30,0 );
    render();
    //end of controls
