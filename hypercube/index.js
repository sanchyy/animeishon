var scene, camera, renderer;

scene    = new THREE.Scene();

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(100,100,100);
camera.lookAt(new THREE.Vector3(0,0,0));


//CAMERA MOVE WITH CURSOR
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableKeys = false;

document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

function draw() {
    //DRAW HYPERCUBE
}

function updateHypercube() {
    //UPDATE HYPERCUBE
}

function animate() {
	requestAnimationFrame( animate );
    updateHypercube();
	renderer.render( scene, camera );
}
animate();
