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

/**
 * Test Sphere
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 16), 
    new THREE.MeshBasicMaterial( { 
        color: 0x4682B4
    } )
); 
scene.add( sphere );

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