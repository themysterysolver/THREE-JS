import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//renderer
const h=window.innerHeight;
const w=window.innerWidth;
const render=new THREE.WebGLRenderer({antialias:true});
render.setSize(w,h);
document.body.appendChild(render.domElement);

//camera
const fov=75;
const aspect=w/h;
const near=1;
const far=100;
const camera=new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=10;

//scene
const scene=new THREE.Scene();

//logic
const geo=new THREE.ConeGeometry(2,10,10); //radius,ht,radial segment
const material=new THREE.MeshStandardMaterial({color:0xffff00,flatShading:true});
const cone=new THREE.Mesh(geo,material)
scene.add(cone);

const wireMat=new THREE.MeshBasicMaterial({
    color: 0xffffff,wireframe:true
})
const wireMesh=new THREE.Mesh(geo,wireMat);
cone.add(wireMesh);

const light = new THREE.HemisphereLight(
    new THREE.Color(1, 0.5, 0), 
    new THREE.Color(0.2, 0, 0.2),  
    1
);
scene.add( light );

//contols
const control=new OrbitControls(camera,render.domElement);

function animate(){
  requestAnimationFrame(animate);
  render.render(scene,camera);
}
animate();