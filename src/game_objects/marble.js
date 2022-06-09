import Matter from 'matter-js';
import * as THREE from 'three';
import { matter_to_three_X, matter_to_three_Y } from '../utils';

const DOT_SIZE = 30;

export class Marble {
    #bod;
    #mesh;
    constructor(x, y, engine, group) {
        // matter stuff
        // create a matter body
        let bod = Matter.Bodies.circle(x, y, DOT_SIZE * 0.5, {
            friction: 0.00001,
            restitution: 0.5,
            density: 0.1
        });
        // add it to the physics world
        Matter.Composite.add(engine.world, bod);
        

        // THREE stuff
        // create a THREE geometry
        let geometry = new THREE.SphereGeometry(30, 16, 16);
        // create a THREE material
        let material = new THREE.MeshPhongMaterial({color: "#ff72d9"});
        // create a THREE mesh
        let mesh = new THREE.Mesh(geometry, material);
        // add the mesh to the scengraph group
        group.add(mesh);

        // set instance variables
        this.#bod = bod;
        this.#mesh = mesh;
    }

    render() {
        // update the position of the render to the physics engine
        let pos = this.#bod.position;
        this.#mesh.position.set(matter_to_three_X(pos.x), matter_to_three_Y(pos.y), 0)
    }
}