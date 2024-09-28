import * as Pixi from "./pixi.mjs";
import Matter from "https://esm.sh/matter-js@0.20.0";;

const container = document.getElementById("game_area");

const app = new Pixi.Application();
await app.init({
  background: "#1099bb",
  resizeTo: container,
});

container.appendChild(app.canvas);

let sprite = new Pixi.Graphics().rect(0, 0, 200, 100).fill(0xff0000);
sprite.cursor = "pointer";
sprite.eventMode = "static";
sprite.on("pointerdown", onClick);
sprite.y = app.screen.height / 2;

app.stage.addChild(sprite);

let elapsed = 0.0;

app.ticker.maxFPS = 60;

let engine = Matter.Engine.create();

const boxBody = Matter.Bodies.rectangle(100, 100, 200, 100, {
  restitution: 1.8,
});

Matter.World.add(engine.world, boxBody);

const ground = Matter.Bodies.rectangle(
  app.screen.width / 2, 
  app.screen.height - 50, 
  app.screen.width, 
  100, 
  { isStatic: true }
);

Matter.World.add(engine.world, ground);

let groundSprite = new Pixi.Graphics()
    .rect(0, 0, app.screen.width, 50).fill(0x00ff00);
groundSprite.y = app.screen.height - 50;

var runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

app.stage.addChild(groundSprite);

function onClick() {

}

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;

  sprite.x = boxBody.position.x;
  sprite.y = boxBody.position.y;

  Matter.Engine.update(engine, ticker.deltaTime * 1000 / 60);
});
