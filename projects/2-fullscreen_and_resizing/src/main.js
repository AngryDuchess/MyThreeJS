import "./style.css";
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
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


window.addEventListener("dblclick", () => {
  if(!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// For older browsers like safari
// const fullScreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled;
// window.addEventListener("dblclick", () => {
//   if(!fullScreen) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) { // Safari
//       canvas.webkitRequestFullscreen();
//     } else if (canvas.mozRequestFullScreen) { // Firefox
//       canvas.mozRequestFullScreen();
//     }
//   }

// })

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
