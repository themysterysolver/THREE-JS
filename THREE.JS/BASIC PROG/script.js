import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w=window.innerWidth;
const h=window.innerHeight;

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov=75;
const aspect=w/h;
const near=0.1
const far=100;
const camera=new THREE.PerspectiveCamera(fov ,aspect ,near ,far);
camera.position.z=30;

const scene=new THREE.Scene();

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xffffff 
    ,flatShading:true
} ); 
const torusKnot = new THREE.Mesh( geometry, material ); //mesh
scene.add( torusKnot );

const light = new THREE.HemisphereLight(
    new THREE.Color(1, 0.5, 0), 
    new THREE.Color(0.2, 0, 0.2),  
    1
);
scene.add( light );

const wireMat=new THREE.MeshBasicMaterial({
    color: 0xffffff,wireframe:true
})
const wireMesh=new THREE.Mesh(geometry,wireMat);
torusKnot.add(wireMesh);

const control=new OrbitControls(camera,renderer.domElement);
control.enableDamping = true;
control.dampinFactor=0.03;

function animate(t=0){
    requestAnimationFrame(animate);
    torusKnot.rotation.y=t*0.0001
    torusKnot.rotation.z=t*0.0003
    renderer.render(scene,camera);
    control.update();
}
animate();