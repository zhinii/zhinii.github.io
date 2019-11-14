
const scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      var canvas = document.querySelector("#objectScene")
      var renderer = new THREE.WebGLRenderer({canvas});
   var loader = new THREE.GLTFLoader();


        const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    scene.background = new THREE.Color('grey');
      const controls = new THREE.OrbitControls( camera, canvas );
      
 camera.position.z = 8;
  camera.position.y = 8;
      controls.update();

//add model object eher


loader.load('head.glb',function(gltf){

    scene.add(gltf.scene);  
    
    });


loader.load('head2.glb',function(gltf){

    scene.add(gltf.scene); 

     stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp2'){
		gltf.scene.visible = false;
	}
	else if (event.target.id === 'sp5'){
		gltf.scene.visible = false;
	}
	else {
		gltf.scene.visible = true;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = true;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = true;
		}
    });

    });

     
     loader.load('s1arrow.glb',function(gltf){
    scene.add(gltf.scene);  
    	gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp1'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf1'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
 
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
});
     
     loader.load('s1obj.glb',function(gltf){
    scene.add(gltf.scene);  
    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp1') {
		gltf.scene.visible = true;
	}
	else if(event.target.id === 'sp8') {
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});

	fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf1'){
		gltf.scene.visible = true;
	}
	else if (event.target.id === 'sf7'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});

menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = true;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = true;
		}
    });

    });

         loader.load('s2arrow.glb',function(gltf){
    scene.add(gltf.scene);  
     gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp2'){
		gltf.scene.visible = true;
	}

	else {
		gltf.scene.visible = false;
	}
	});


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf2'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});

		menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
     loader.load('s2obj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;

  stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp2') {
		gltf.scene.visible = true;
	}

	else {
		gltf.scene.visible = false;
	}
	});


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf2'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
         loader.load('s3arrow.glb',function(gltf){
    scene.add(gltf.scene);  
     gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp3'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
     loader.load('s3obj.glb',function(gltf){
    scene.add(gltf.scene);  

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp3'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});

	 fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf3'){
		gltf.scene.visible = true;
	}
	else if (event.target.id === 'sf2'){
		gltf.scene.visible = true;
	}
	else if (event.target.id === 'sf4'){
		gltf.scene.visible = true;
	}
	else if (event.target.id === 'sf5'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
         loader.load('s4arrow.glb',function(gltf){
    scene.add(gltf.scene);  
     gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp4'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
     loader.load('s4obj.glb',function(gltf){
    scene.add(gltf.scene);  

     stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp4'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });

         loader.load('s5arrow.glb',function(gltf){
    scene.add(gltf.scene);  
     gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp5'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
     loader.load('s5obj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp5'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });

     loader.load('s5clearobj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp5'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
         loader.load('s6arrow.glb',function(gltf){
    scene.add(gltf.scene);  
     gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp6'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
     loader.load('s6obj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp6'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     

         loader.load('s7arrow.glb',function(gltf){
    scene.add(gltf.scene);  
     gltf.scene.visible = false;

    stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp7'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf6'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});

	menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
     loader.load('s7obj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


     stepList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sp7'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});

     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf6'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     

       loader.load('21arrow.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf3'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     


       loader.load('21obj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf3'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     
  loader.load('22arrow.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf4'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     


       loader.load('22obj.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf4'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     

       loader.load('23arrow.glb',function(gltf){
    scene.add(gltf.scene);  
        	gltf.scene.visible = false;


     fanList.addEventListener('click', function(){
    for (var i = 0; i < allSteps.length; i ++)
	if (event.target.id === 'sf5'){
		gltf.scene.visible = true;
	}
	else {
		gltf.scene.visible = false;
	}
	});
     menu.addEventListener('click', function(){
		if (event.target.id === 'printhead'){
			gltf.scene.visible = false;
		}
		else if(event.target.id === 'fan'){
			gltf.scene.visible = false;
		}
    });
    });
     

     
     


     //end model object code here
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

      var animate = function () {
        requestAnimationFrame( animate );
      controls.update();

        renderer.render( scene, camera );
      };


      animate();