var baseColor = 0xffffff;

var menuClick = document.getElementById('menu');



//zaxis parts

var loader = new THREE.OBJLoader();

loader.load('models/Zbelt.obj', function(object) {
    object.traverse(function(child) {
        if (child instanceof THREE.Mesh)
            child.material.color.setHex(baseColor);
    });
    scene.add(object);

    var thing = document.getElementById('zbelt');
    menuClick.addEventListener('click', function() {
        if (event.target == thing) {
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xff0000);
                }
            });
        } else {
            object.traverse(function(child) {
                if (child.material) {
                    child.material.color.setHex(0xffffff);
                }
            });
        }
    });
});
