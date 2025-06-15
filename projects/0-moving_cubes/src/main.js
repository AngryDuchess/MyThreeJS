import * as THREE from 'three';
// import { time } from 'three/tsl';

// const canvas = document.querySelector("canvas.webgl")
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5)
const group = new THREE.Group()

scene.add(group,axesHelper)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x=2

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x=-2
group.add(cube1,cube2,cube3)
group.scale.y=2

group.position.normalize()
const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5;

scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
// renderer.setAnimationLoop( animate );
// renderer.render(scene, camera);
document.body.appendChild( renderer.domElement );

function animate(time) {
    const t = time * 0.001; 

    // group.rotation.x += 0.01;
    group.rotation.y += 0.01;

    cube1.material.color.setHSL(Math.sin(t) * 0.5 + 0.5, 1, 0.5);
    cube2.material.color.setHSL(Math.sin(t + 2) * 0.5 + 0.5, 1, 0.5);
    cube3.material.color.setHSL(Math.sin(t + 4) * 0.5 + 0.5, 1, 0.5);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();