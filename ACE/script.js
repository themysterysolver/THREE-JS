import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer();
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov=75;
const aspect=w/h;
const near=0.1;
const far=10;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=3;

const scene=new THREE.Scene();

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();