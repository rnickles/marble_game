import './index.css';
import './styles.css';
import Matter from 'matter-js';
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { init_level } from "./levels/level1";

// This function is called once the window loads and is responsible for setting up the game.
function init() {
  
  // establish the renderer
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // setup the camera
  let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.x = 0;//-100;
  camera.position.y = 200;
  camera.position.z = 1600;

  // setup the camera controls to accept input from a mouse or touch
  THREE.MOUSE.PAN = 0; // set pan to the left click
  THREE.MOUSE.ROTATE = 2;
  const controls = new TrackballControls(camera, renderer.domElement);
  controls.noRotate = true; // we don't want rotation

  // create a scene-graph data structure
  let scene = new THREE.Scene();

  // create a Matter.js engine
  let engine = Matter.Engine.create({gravity:{y:-1}});

  // initialize the level and retrieve a list of game objects
  let _bodies = init_level(engine, scene);
  
  // run the physics engine
  Matter.Runner.run(engine);

  // lighting
  let dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(-30, 50, 40);
  scene.add(dirLight);

  //
  // THE GAME LOOP
  //
  function render() {

    requestAnimationFrame(render);

    // sychronize the rendered representation with the physical representation.
    for (let j = 0; j < _bodies.length; j++) {
      _bodies[j].render()
    }

    // update any changes to the view based on user input from either mouse or touch.
    controls.update();

    // update the screen
    renderer.render(scene, camera);
  }

  render();
}

// schedule to call init() once the page loads.
window.addEventListener('load', init);
