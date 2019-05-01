let p4 = function (x,y,z,w) {this.x=x; this.y=y; this.z=z; this.w=w;}
let p3 = function (x,y,z) {this.x=x; this.y=y; this.z=z;} 
let hypercube  = []
let projection = []
const IM = [[1,0,0,0],[0,1,0,0],[0,0,1,0]];

hypercube[0]  = new p4(-50,-50,-50,50);
hypercube[1]  = new p4(50,-50,-50,50);
hypercube[2]  = new p4(50,50,-50,50);
hypercube[3]  = new p4(-50,50,-50,50);
hypercube[4]  = new p4(-50,-50,50,50);
hypercube[5]  = new p4(50,-50,50,50);
hypercube[6]  = new p4(50,50,50,50);
hypercube[7]  = new p4(-50,50,50,50);
hypercube[8]  = new p4(-50,-50,-50,-50);
hypercube[9]  = new p4(50,-50,-50,-50);
hypercube[10] = new p4(50,50,-50,-50);
hypercube[11] = new p4(-50,50,-50,-50);
hypercube[12] = new p4(-50,-50,50,-50);
hypercube[13] = new p4(50,-50,50,-50);
hypercube[14] = new p4(50,50,50,-50);
hypercube[15] = new p4(-50,50,50,-50);

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

function PM(mat,v) {
    let _x = mat[0][0]*v.x + mat[0][1]*v.y + mat[0][2]*v.z + mat[0][3]*v.w;
    let _y = mat[1][0]*v.x + mat[1][1]*v.y + mat[1][2]*v.z + mat[1][3]*v.w;
    let _z = mat[2][0]*v.x + mat[2][1]*v.y + mat[2][2]*v.z + mat[2][3]*v.w;
    return new p3(_x,_y,_z);
}


function draw() {
    //SAVE PROJECTIONS
    let i = 0 
    for (let vertex of hypercube) { 
        hypercube[i] = PM(IM,vertex);
        ++i;
    }

    //DRAW LINES
         
    

}

function updateHypercube() {
    //UPDATE HYPERCUBE
}

function animate() {
	requestAnimationFrame( animate );
    //updateHypercube();
	renderer.render( scene, camera );
}

draw();
animate();
