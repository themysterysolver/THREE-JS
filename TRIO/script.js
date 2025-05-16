import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

//renderer
const h=window.innerHeight;
const w=window.innerWidth;
const render=new THREE.WebGLRenderer({antialias:true});
render.setSize(w,h);
render.setClearColor(0x111111)
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
gui.add(params,'count',10,2000,1).onChange(createObjects); //obj,key to the param(property),min,max,step
gui.add(params,'opacity',0.12,1,0.01).onChange(changeOpacity);

//groups
const rotatingGroup=new THREE.Group(); //just used for grouping!
scene.add(rotatingGroup);

//box to confine everything
const boxSize=200;
const boxGeo=new THREE.BoxGeometry(boxSize,boxSize,boxSize,boxSize);//w,h,d
const edges=new THREE.EdgesGeometry(boxGeo);//takes geo as I/P and extracts only edges
const boxMaterial=new THREE.LineBasicMaterial({color:0x000000});
const boxWireframe=new THREE.LineSegments(edges,boxMaterial);//draw only lines
//rotatingGroup.add(boxWireframe);


//geometry types
const geoTypes=[
  new THREE.BoxGeometry(),
  new THREE.SphereGeometry(1,16,16), //r,width seg,ht seg
  new THREE.ConeGeometry(1,2,16) //r,ht,rad seg
]
//random pos inside object
function randomPositionInisde(){
  return Math.random()*boxSize - boxSize/2;
}
// random rotation
function randomRotation(){
  return new THREE.Euler( //angle
    Math.random()* Math.PI*2,Math.random()* Math.PI*2,Math.random()* Math.PI*2 //180*60=360
  )
}
// object creation
let objects=[];
function createObjects(){
  rotatingGroup.clear();
  objects=[];
  for(let i=0;i<params.count;i++){
    const geo=geoTypes[Math.floor(Math.random()*geoTypes.length)];
    const material=new THREE.MeshNormalMaterial({
      transparent:true,
      opacity:params.opacity
    });//it clrs each face based on the direction it's facing in 3D space,thus RAINBOW
    const mesh=new THREE.Mesh(geo,material);
    mesh.position.set(randomPositionInisde(),randomPositionInisde(),randomPositionInisde());
    mesh.scale.set(8,8,8);
    mesh.rotation.copy(randomRotation());
    mesh.userData.rotationSpeed=randomRotationSpeed();
    rotatingGroup.add(mesh);
    objects.push(mesh);
  }
}
//randomRoattaionSPeed
function randomRotationSpeed(){
  return new THREE.Vector3( 
      (Math.random() -0.5)*0.02,
      (Math.random() -0.5)*0.02,
      (Math.random() -0.5)*0.02 
    );
}
//chnageopcaity
function changeOpacity(){
  objects.forEach(ele=>{
    ele.material.opacity=params.opacity;
  })
}

//-------------------------------------------------------------
//contols
const control=new OrbitControls(camera,render.domElement);

function animate(){
  requestAnimationFrame(animate);
  rotatingGroup.rotation.z+=0.001;
  rotatingGroup.rotation.y+=0.0015;
  objects.forEach(ele=>{
     const rot=ele.userData.rotationSpeed;
     ele.rotation.x+=rot.x;
     ele.rotation.y+=rot.y;
     ele.rotation.z+=rot.z;
  })
  render.render(scene,camera);
}
createObjects();
animate();