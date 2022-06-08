import Matter from 'matter-js';
import * as THREE from 'three';

export class Wall {
    constructor(x, y, width, height, engine, group) {
        // matter stuff
        // create a matter body
        var bod = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true});
        // add it to the physics world
        Matter.World.add(engine.world, bod)

        // THREE stuff
        // create a THREE geometry
        var geometry = new THREE.BoxGeometry(width, height, 170);
        // create a THREE material
        var material = new THREE.MeshPhongMaterial({color: 0x276a4b});
        // create a THREE mesh
        var mesh = new THREE.Mesh(geometry, material);
        // add the mesh to the scengraph group
        group.add(mesh)
    }

    render() {
        // update the position of render to the simulation
    }
}