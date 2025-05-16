import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//renderer
const h=window.innerHeight;
const w=window.innerWidth;
const render=new THREE.WebGLRenderer({antialias:true});
render.setSize(w,h);
render.setClearColor(0xffffad)
document.body.appendChild(render.domElement);

//camera
const fov=75;
const aspect=w/h;
const near=1;
const far=1000;
const camera=new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=150;

//scene
const scene=new THREE.Scene();

//logic
const gui=new dat.GUI();
const params={count:100,opacity:1.0} //this decides the value
gui.add(params,'count',10,2000,1).onChange((val)=>{
  console.log("count",val);
}); //obj,key to the param(property),min,max,step
gui.add(params,'opacity',0,1,0.01).onChange((val)=>{
  console.log("opacity",val);
});

//contols
const control=new OrbitControls(camera,render.domElement);

function animate(){
  requestAnimationFrame(animate);
  render.render(scene,camera);
}
animate();