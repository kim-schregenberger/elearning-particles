import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// hide GUI
gui.domElement.style.display = 'none';

// Toggle GUI visibility when pressing 'h'
document.addEventListener('keydown', (event) => {
    if (event.key === 'h' || event.key === 'H') {
        const guiContainer = gui.domElement;
        if (guiContainer.style.display === 'none') {
            guiContainer.style.display = 'block';
        } else {
            guiContainer.style.display = 'none';
        }
    }
});


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(
    '/elearning-particles/textures/particles/1.png',
    () => {
        console.log('Texture loaded successfully.');
    },
    undefined,
    (error) => {
        console.error('Error loading texture:', error);
    }
);


/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 50000;

// Arrays to hold positions and colors
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

// Radius of the sphere
const radius = 5;

for (let i = 0; i < count; i++) {
    // Generate random spherical coordinates
    const theta = Math.random() * 2 * Math.PI; // Azimuthal angle
    const phi = Math.acos(2 * Math.random() - 1); // Polar angle
    const r = Math.cbrt(Math.random()) * radius; // Radius

    // Convert spherical coordinates to Cartesian coordinates
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    // Set positions
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Set colors (random RGB)
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
}

// Create and set attributes
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.08
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new THREE.Color('#4682B4')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.alphaTest = 0.01
particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = -12
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

// Update particles


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// ----------------------------------------------------------------------------------------

// Code trigger
document.getElementById('toggleCode').addEventListener('click', function() {
    var codeBlock = document.getElementById('codeBlock');
    if (codeBlock.classList.contains('hidden')) {
        codeBlock.classList.remove('hidden');
        this.textContent = 'hide code'; // Optionally change button text
    } else {
        codeBlock.classList.add('hidden');
        this.textContent = 'show code'; // Optionally change button text
    }
});

// ----------------------------------------------------------------------------------------