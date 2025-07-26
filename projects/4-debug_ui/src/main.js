import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";

const gui = new GUI();

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const mesh = new THREE.Mesh(
  // new THREE.BoxGeometry(1, 1, 1),
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(mesh);
gui.add(mesh.position, "x").min(-5).max(5).step(0.01).name("Position X");

const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  cursor.x = (e.clientX / innerWidth) * 0.5;
  cursor.y = -(e.clientY / innerHeight) * 0.5;
});

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
