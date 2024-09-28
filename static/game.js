import { currentInput, initInputCapture } from "./input.js";
import * as Pixi from "./pixi.mjs";
import Matter from "https://esm.sh/matter-js@0.20.0";;
import { Platform } from "./object.js";

const container = document.getElementById("game_area");

const app = new Pixi.Application();
await app.init({
  background: "#1099bb",
  resizeTo: container,
});
let engine = Matter.Engine.create();
let gameObjects = []

container.appendChild(app.canvas);
app.canvas.setAttribute("tabindex", "1");

// Init capturing input when canvas is focused
//  All input is now in currentInput object
initInputCapture(app.canvas);

let player = new Platform(200, 100, 0xff0000, false);
let ground = new Platform(app.screen.width, 100, 0x00ff00);
player.body.restitution = 1.8;
Matter.Body.setPosition(ground.body, { x: 0, y: app.screen.height - 50 });

player.sprite.interactive = true;
player.sprite.on("pointerdown", (event) => {
    player.delete();
});

player.register(app, engine, gameObjects);
ground.register(app, engine, gameObjects);

let elapsed = 0.0;

app.ticker.maxFPS = 60;

var runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;

  if (currentInput.goingRight) {
      let velocity = player.body.velocity;
      Matter.engine.setVelocity(player.body, { x: 5, y: velocity.y });
  }
  if (currentInput.goingLeft) {
        let velocity = player.body.velocity;
        Matter.engine.setVelocity(player.body, { x: -5, y: velocity.y });
  }
  if (currentInput.goingUp) {
      let velocity = player.body.velocity;
        Matter.engine.setVelocity(player.body, { x: velocity.x, y: -5 });
  }
  if (currentInput.goingDown) {
        let velocity = player.body.velocity;
        Matter.engine.setVelocity(player.body, { x: velocity.x, y: 5 });
  }

  Matter.Engine.update(engine, ticker.deltaTime * 1000 / 60);

  for(let obj of gameObjects) {
    obj.update();
  }
});
