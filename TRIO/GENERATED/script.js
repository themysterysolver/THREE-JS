import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 150;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// GUI setup
const gui = new dat.GUI();
const params = {
  count: 100,
  opacity: 1.0
};
gui.add(params, 'count', 10, 2000, 1).onChange(initObjects);
gui.add(params, 'opacity', 0, 1, 0.01).onChange(updateOpacity);

// Group to contain all rotating objects
const rotatingGroup = new THREE.Group();
scene.add(rotatingGroup);

// Optional: wireframe box to visualize the cube
const boxSize = 200;
const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
const boxEdges = new THREE.EdgesGeometry(boxGeometry);
const boxMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const boxWireframe = new THREE.LineSegments(boxEdges, boxMaterial);
// rotatingGroup.add(boxWireframe);  // Add to rotating group

let objects = [];

const geometryTypes = [
  new THREE.BoxGeometry(),
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.ConeGeometry(1, 2, 16),
];

function randomRotationSpeed() {
  return new THREE.Vector3(
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01,
    (Math.random() - 0.5) * 0.01
  );
}

function randomRotation() {
  return new THREE.Euler(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
}

function initObjects() {
  // Remove all children except the wireframe cube
  rotatingGroup.clear();
  objects = [];

  for (let i = 0; i < params.count; i++) {
    const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: params.opacity
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      Math.random() * boxSize - boxSize / 2,
      Math.random() * boxSize - boxSize / 2,
      Math.random() * boxSize - boxSize / 2
    );

    mesh.scale.set(8, 8, 8);
    mesh.rotation.copy(randomRotation());
    mesh.userData.rotationSpeed = randomRotationSpeed();

    rotatingGroup.add(mesh);
    objects.push(mesh);
  }
}

function updateOpacity() {
  objects.forEach(obj => {
    obj.material.opacity = params.opacity;
  });
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate entire group (like cube rotating)
  rotatingGroup.rotation.y += 0.0015;
  rotatingGroup.rotation.x += 0.001;

  // Each object also spins on its own
  objects.forEach(obj => {
    const rot = obj.userData.rotationSpeed;
    obj.rotation.x += rot.x;
    obj.rotation.y += rot.y;
    obj.rotation.z += rot.z;
  });

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

initObjects();
animate();