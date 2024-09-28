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

container.appendChild(app.canvas);
app.canvas.setAttribute("tabindex", "1");

// Init capturing input when canvas is focused
//  All input is now in currentInput object
initInputCapture(app.canvas);

let player = new Platform(app, engine, 200, 100, 0xff0000, false);
let ground = new Platform(app, engine, app.screen.width, 100, 0x00ff00);
player.body.restitution = 1.8;
Matter.Body.setPosition(ground.body, { x: 0, y: app.screen.height - 50 });

let elapsed = 0.0;

app.ticker.maxFPS = 60;

var runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;

  // if (currentInput.goingRight) {
  //   boxBody.position.x += 5;
  // }
  // if (currentInput.goingLeft) {
  //   boxBody.position.x -= 5;
  // }
  // if (currentInput.goingUp) {
  //   boxBody.position.y -= 5;
  // }
  // if (currentInput.goingDown) {
  //   boxBody.position.y += 5;
  // }

  Matter.Engine.update(engine, ticker.deltaTime * 1000 / 60);
 
  player.update();
  ground.update();
});
