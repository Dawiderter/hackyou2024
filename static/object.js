import Matter from "https://esm.sh/matter-js@0.20.0";;
import * as Pixi from "./pixi.mjs";

export class Object {
    constructor(app, engine, body, sprite) {
        this.body = body;
        this.sprite = sprite;

        Matter.World.add(engine.world, body);
        app.stage.addChild(sprite);
    }

    update() {
        this.sprite.position.set(this.body.position.x, this.body.position.y);
        this.sprite.rotation = this.body.angle;
    }
}

export class Platform extends Object {
    constructor(app, engine, width, height, fill, is_static = true) {
        let sprite = new Pixi.Graphics()
            .rect(0, 0, width, height).fill(fill);

        let body = Matter.Bodies.rectangle(width / 2, height / 2, width, height, {
            isStatic: is_static,
        });

        super(app, engine, body, sprite);
    }
}
