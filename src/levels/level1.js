import Matter from 'matter-js';
import * as THREE from 'three';
import { Wall } from "../game_objects/wall"

export function init_level(engine, scene) {
    // create a group
    var group = new THREE.Object3D();
    // add the group to the scene
    scene.add(group);

    // the list of bodies in the level to be returned
    var _bodies = [];
    
    // create a wall that belongs to the group
    var _w = new Wall(400, 610, 1000, 100, engine, group);
    // add it to _bodies
    _bodies.push(_w);

    // run the engine
    Matter.Runner.run(engine);

    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-30, 50, 40);
    scene.add(dirLight);
    
    return _bodies
}
