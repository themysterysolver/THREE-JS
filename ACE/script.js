import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer();
renderer.setSize(w,h);
renderer.setClearColor(new THREE.Color(1.0, 0.9, 0.95));
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);

const fov=75;
const aspect=w/h;
const near=0.1;
const far=10;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=3;


const scene=new THREE.Scene();
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
// controls.dampingFactor=0.1;

const loader=new THREE.TextureLoader();
const front_texture=loader.load('assets/front.png');
const back_texture=loader.load('assets/back.png');

const frontMaterial=new THREE.MeshBasicMaterial({map:front_texture});
const backMaterial=new THREE.MeshBasicMaterial({map:back_texture});

const geometry=new THREE.PlaneGeometry(2,3);

const frontCard=new THREE.Mesh(geometry,frontMaterial);
const backCard=new THREE.Mesh(geometry,backMaterial);

frontCard.position.z=0.01
backCard.rotation.y=Math.PI;
backCard.position.z=-0.01

scene.add(frontCard);
scene.add(backCard);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}
animate();