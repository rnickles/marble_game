import Matter from 'matter-js';
import * as THREE from 'three';
import { matter_to_three_X, matter_to_three_Y } from '../utils';

export class Wall {
    constructor(x, y, width, height, engine, group) {
        // matter stuff
        // create a matter body
        let bod = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true});
        // add it to the physics world
        Matter.Composite.add(engine.world, bod)

        // THREE stuff
        // create a THREE geometry
        let geometry = new THREE.BoxGeometry(width, height-30, 300);
        // create a THREE material
        let material = new THREE.MeshPhongMaterial({color: 0x276a4b});
        // create a THREE mesh
        let mesh = new THREE.Mesh(geometry, material);
        // add the mesh to the scengraph group
        group.add(mesh)

        // align the mesh to the body
        mesh.position.set(matter_to_three_X(x), matter_to_three_Y(y));
    }

    render() {
        // update the position of the render to the physics engine
        // since it is a static body this function does nothing
    }
}