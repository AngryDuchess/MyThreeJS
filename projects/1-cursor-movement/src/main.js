import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (event) => {
  cursor.x = (event.clientX / window.innerWidth) * 0.5;
  cursor.y = -(event.clientY / window.innerHeight) * 0.5;
});

const scene = new THREE.Scene();

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(cube);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z = 3;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

function animate() {
  // camera follows cursor movement
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(cube.position);

  // Drag the camera with mouse
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
