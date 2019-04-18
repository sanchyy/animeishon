const PI    = Math.PI;
const PI_H  = Math.PI/2;
const PI_Q  = Math.PI/4;
const asin  = (x) => Math.asin(x);
const atan  = (x) => Math.atan(x);
const sin   = (x) => Math.sin(x);
const dist  = (x1,y1,x2,y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
const map   = (val, start1, stop1, start2, stop2, bul) =>(val - start1) / (stop1 - start1) * (stop2 - start2) + start2;
const floor  = (x) => Math.floor(x);
const rect  = (x,y,z) => new THREE.Mesh(new THREE.BoxGeometry(x, y, z), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
const edges = (geom, col) => new THREE.LineSegments( new THREE.EdgesGeometry( geom ), new THREE.LineBasicMaterial({ color: col, linewidth:1 }));


const WIDTH = 640;
const HEIGHT= 640;
const SIZE  = 40;
const w     = 5;
const MAXD  = dist(0,0,200,200); //MAGIC NUMBERS XD
let angle   = 0;
let array   = [];

var scene, camera, renderer;
scene       = new THREE.Scene();
camera      = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer    = new THREE.WebGLRenderer();

//INI CAMERA
camera.position.set(50,300,300)

camera.lookAt(new THREE.Vector3(w*SIZE/2,0,w*SIZE/2));
scene.add(camera);

//CAMERA MOVE WITH CURSOR
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableKeys = false;

renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild( renderer.domElement );

//GORAETA
function draw () {
  for (let i = 0; i < w*SIZE; i += w) {
    for (let j = 0; j < w*SIZE; j += w) {
      let _aux = rect(w,w*5,w); _aux.add(edges(_aux.geometry, 0xFFFFFF)); _aux.position.set(i,0,j)
      array.push(_aux);
      scene.add(_aux);
    }
  }
}

function updateWave () {
  for (elem of array) {
    x = elem.position.x;
    z = elem.position.z;
    let d   = dist(x,z,w*SIZE/2,w*SIZE/2); //distancia al centre
    let off  = map(d,0,MAXD,-PI,PI);
    let h   = floor(map(sin(angle+off), -1, 1, 0, 200)) /45;
    let xx  = elem.geometry.parameters.width;
    let zz  = elem.geometry.parameters.depth;
    elem.scale.set(xx,h,zz)
  }
  angle -= 0.1;
}

/* draw = () => {
    let objects = []
    for (let i = 0; i < SIZE; ++i) {
        for (let j = 0; j < SIZE; ++j) {

            //RECT
            var geometry = new THREE.BoxGeometry( 9, 45, 9 );
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.set(MAGIC + 9*i, 0, MAGIC + 9*j);

            //EDGES
            var eGeometry = new THREE.EdgesGeometry( mesh.geometry );
            var eMaterial = new THREE.LineBasicMaterial( { color: 0xFFFFFF, linewidth: 2 } );
            var edges = new THREE.LineSegments( eGeometry , eMaterial );

            mesh.add( edges );
            objects.push(mesh);
        }
     }
    return objects
} */


function animate() {
  requestAnimationFrame( animate );
  updateWave();
  renderer.render( scene, camera );
}

draw();
animate();
