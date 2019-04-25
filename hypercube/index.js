let p4 = (x,y,z,w) => {this.x=x; this.y=y; this.z=z; this.w=w;}
let p3  = (x,y,z) => {this.x=x; this.y=y; this.z=z;} 
const IM = [[1,0,0,0],[0,1,0,0],[0,0,1,0]];

var scene, camera, renderer;

scene    = new THREE.Scene();

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50,50,50);
camera.lookAt(new THREE.Vector3(0,0,0));


//CAMERA MOVE WITH CURSOR
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableKeys = false;

document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

let PM = function(m,v) {
    let _x = m[0][0]*v.x + m[0][1]*v.y + m[0][2]*v.z + m[0][3]*v.w;
    let _y = m[1][0]*v.x + m[1][1]*v.y + m[1][2]*v.z + m[1][3]*v.w;
    let _z = m[2][0]*v.x + m[2][1]*v.y + m[2][2]*v.z + m[2][3]*v.w;
    return new p3(_x,_y,_z);
}


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

draw();
animate();
