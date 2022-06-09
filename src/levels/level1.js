// import Matter from 'matter-js';
import * as THREE from 'three';
import { Wall } from "../game_objects/wall"
import { Marble } from "../game_objects/marble"

export function init_level(engine, scene) {
    // create a group
    let group = new THREE.Object3D();
    // add the group to the scene
    scene.add(group);

    // the list of bodies in the level to be returned
    let _bodies = [];
    
    // create a wall that belongs to the group
    let _w = new Wall(0, 610, 1000, 100, engine, group);
    // add it to _bodies
    _bodies.push(_w);

    // create a wall that belongs to the group
    let _w2 = new Wall(0, 0, 1000, 100, engine, group);
    // add it to _bodies
    _bodies.push(_w2);

    // create a marble that drops onto the ground
    let _m = new Marble(0, 600, engine, group);
    // add it to _bodies
    _bodies.push(_m);

    return _bodies
}
