import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//renderer setup
const width=window.innerWidth;
const height=window.innerHeight;
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width,height);
document.body.appendChild(renderer.domElement);

//camera setup
const fov=75;
const aspect=width/height;
const near=0.1;
const far=2000;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=3;

//scene
const scene=new THREE.Scene();

//defining sphere,material,mesh
const earth=new THREE.SphereGeometry(1.2, 32, 32);
const material=new THREE.MeshStandardMaterial({color:0x1e90ff,flatShading:true});
const sphere=new THREE.Mesh(earth,material);

scene.add(sphere);

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

//adding light
const light=new THREE.HemisphereLight(0xadd8e6, 0x001f3f, 2);
scene.add(light)

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

//adding wire
const wire=new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true});
const wireMesh=new THREE.Mesh(earth,wire);
sphere.add(wireMesh);

//controls
const control=new OrbitControls(camera,renderer.domElement);
// ---------------------------DONE WITH SPHERE ONE-----------------------------------------------

//pivot
const pivot=new THREE.Object3D();
pivot.position.set(0, 0, 0);
scene.add(pivot);


const moon=new THREE.SphereGeometry(0.5, 32, 16);
const moon_material=new THREE.MeshStandardMaterial({color:0xaaaaaa,roughness:0.8,metalness:0.1});
const moonMesh=new THREE.Mesh(moon,moon_material);
moonMesh.position.x=2;
const wireMeshMoon=new THREE.Mesh(moon,wire);
moonMesh.add(wireMeshMoon)
pivot.add(moonMesh);
//-------------------------------DONE WITH MOON------------------

const starCount=5000;
const starGeometry=new THREE.BufferGeometry();
const starPositions=new Float32Array(starCount*3);

for(let i=0;i<starCount;i++){
    const i3=i*3;
    starPositions[i3]=(Math.random()-0.5)*2000;
    starPositions[i3+1]=(Math.random()-0.5)*2000;
    starPositions[i3+2]=(Math.random()-0.5)*2000;

}
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

const starMaterial=new THREE.PointsMaterial({color:0xffffff,size:0.05});
const stars=new THREE.Points(starGeometry,starMaterial);
scene.add(stars);

function animate(){
    requestAnimationFrame(animate);
    pivot.rotation.y +=0.002;
    sphere.rotation.y +=0.001
    stars.rotation.y +=0.0001
    moonMesh.rotation.y +=0.0015
    renderer.render(scene,camera);
}
animate();

