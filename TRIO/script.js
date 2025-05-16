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
const far=3000;
const camera=new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=300;

//scene
const scene=new THREE.Scene();

//logic

//gui
const gui=new dat.GUI();
const params={count:100,opacity:1.0} //this decides the value
gui.add(params,'count',10,2000,1).onChange(); //obj,key to the param(property),min,max,step
gui.add(params,'opacity',0,1,0.01).onChange();

//groups
const rotatingGroup=new THREE.Group(); //just used for grouping!
scene.add(rotatingGroup);

//box to confine everything
const boxSize=200;
const boxGeo=new THREE.BoxGeometry(boxSize,boxSize,boxSize,boxSize);//w,h,d
const edges=new THREE.EdgesGeometry(boxGeo);//takes geo as I/P and extracts only edges
const boxMaterial=new THREE.LineBasicMaterial({color:0x000000});
const boxWireframe=new THREE.LineSegments(edges,boxMaterial);//draw only lines
rotatingGroup.add(boxWireframe);


//-------------------------------------------------------------
//contols
const control=new OrbitControls(camera,render.domElement);

function animate(){
  requestAnimationFrame(animate);
  render.render(scene,camera);
}
animate();