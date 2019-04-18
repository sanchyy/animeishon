const PI    = Math.PI;
const PI_H  = Math.PI/2;
const PI_Q  = Math.PI/4;
const asin  = (x) => Math.asin(x);
const atan  = (x) => Math.atan(x);
const sin   = (x) => Math.sin(x); 
const dist  = (x1,y1,x2,y2) => Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
const map   = (val, start1, stop1, start2, stop2, bul) =>(val - start1) / (stop1 - start1) * (stop2 - start2) + start2; 
const floor = (x) => Math.floor(x);
const WIDTH = 640;
const HEIGHT= 640;
const SIZE  = 20;
const MAGIC = - SIZE/2 * 9;
const MAXD  = dist(0,0,200,200);
let x  = 0;
var scene, camera, renderer;


scene       = new THREE.Scene();
camera      = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer    = new THREE.WebGLRenderer();

camera.position.set(-100, 100 , -200);
camera.lookAt(new THREE.Vector3(0,0,0));

scene.add(new THREE.AmbientLight( 0x123456 ));

renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableKeys = false;

scene.add(camera);
draw = () => {
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
}


let array = draw();

for (obj of array)
    scene.add(obj);

function animate() {
	requestAnimationFrame( animate ); 
    for (obj of array) {
        //let hei = obj.geometry.parameters.height;
        let k   = obj.matrixWorld.getPosition().x/9 - MAGIC;  
        let l   = obj.matrixWorld.getPosition().z/9 - MAGIC;
        let d   = dist(k,l,0,0) //dist with (0,0) 
        let off = floor(map(d,0,MAXD,-1,1));
        let a   = x + off;
        let h   = map(sin(a), -1, 1, 0, 300);
        let xx   = obj.geometry.parameters.width;
        let z   = obj.geometry.parameters.depth;
        obj.scale.set(xx,h,z)
        x += 0.25;
    }
    renderer.render( scene, camera );
    
}
animate();

