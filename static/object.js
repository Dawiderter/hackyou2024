import Matter from "https://esm.sh/matter-js@0.20.0";;
import * as Pixi from "./pixi.mjs";

export class Object {
    constructor(body, sprite) {
        this.body = body;
        this.sprite = sprite;
    }

    update() {
        this.sprite.position.set(this.body.position.x, this.body.position.y);
        this.sprite.rotation = this.body.angle;
    }

    register(app, engine, objects) {
        Matter.World.add(engine.world, this.body);
        app.stage.addChild(this.sprite);
        objects.push(this);

        // TODO: This is temporary
        this.objectsContainer = objects;
        this.app = app
        this.engine = engine
    }

    // NOTE: Very inefficient,
    // TODO: Change this garbage
    delete() {
        Matter.World.remove(this.engine.world, this.body);
        this.sprite.destroy();
        this.objectsContainer.splice(this.objectsContainer.indexOf(this), 1);
    }
}

export class Platform extends Object {
    constructor(width, height, fill, is_static = true) {
        let sprite = new Pixi.Graphics()
            .rect(0, 0, width, height).fill(fill);

        let body = Matter.Bodies.rectangle(width / 2, height / 2, width, height, {
            isStatic: is_static,
        });

        super(body, sprite);
    }
}
