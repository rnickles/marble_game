import Matter from 'matter-js';
import * as THREE from 'three';

export class Wall {
    #bod
    constructor(x, y, width, height, engine, group) {
        // matter stuff
        // create a matter body
        let bod = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true});
        // add it to the physics world
        Matter.Composite.add(engine.world, bod)

        // THREE stuff
        // create a THREE geometry
        let geometry = new THREE.BoxGeometry(width, height-30, 300); //hack to prevent overlap
        // create a THREE material
        let material = new THREE.MeshPhongMaterial({color: 0x276a4b});
        // create a THREE mesh
        let mesh = new THREE.Mesh(geometry, material);
        // add the mesh to the scengraph group
        group.add(mesh)

        // align the mesh to the body
        mesh.position.set(x, y);

        // keep an instance variable
        this.#bod = bod;
    }

    // getter to access read-only private instance variable
    get bod() {
        return this.#bod;
    }

    render() {
        // update the position of the render to the physics engine
        // since it is a static body this function does nothing
    }
}

export class Goal extends Wall {
    #detector
    constructor(x, y, engine, group, marble) {
        super(x, y, 200, 100, engine, group);
        this.#detector = Matter.Detector.create({bodies: [this.bod, marble]});
    }

    render() {
        if (Matter.Detector.collisions(this.#detector).length !== 0) {
            console.log("winner")
        }
    }

}