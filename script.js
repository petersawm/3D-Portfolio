// Simple Three.js 3D animated background for hero section
let scene, camera, renderer, animationId, geometry, material, mesh;
let plane; // Make plane accessible globally

function init3D() {
    const container = document.getElementById('three-canvas');
    if (!container) return;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(renderer.domElement);

    geometry = new THREE.IcosahedronGeometry(1.3, 1);
    material = new THREE.MeshStandardMaterial({
        color: 0x00e6d0,
        flatShading: true,
        metalness: 0.3,
        roughness: 0.5,
        wireframe: false
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const light1 = new THREE.PointLight(0xffffff, 0.8);
    light1.position.set(5, 5, 5);
    scene.add(light1);
    const light2 = new THREE.PointLight(0xffb86c, 0.6);
    light2.position.set(-5, -3, 5);
    scene.add(light2);

    animate();
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    animationId = requestAnimationFrame(animate);
    mesh.rotation.x += 0.008;
    mesh.rotation.y += 0.012;
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.getElementById('three-canvas');
    if (!container || !renderer || !camera) return;
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

document.addEventListener('DOMContentLoaded', init3D);
