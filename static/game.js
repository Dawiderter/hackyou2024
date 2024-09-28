import * as Pixi from "./pixi.mjs";
import Player from "./player.js";

const app = new Pixi.Application();
await app.init({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.canvas);

let sprite = new Pixi.Graphics().rect(0, 0, 200, 100).fill(0xff0000);
sprite.cursor = "pointer";
sprite.eventMode = "static";
sprite.on("pointerdown", onClick);
sprite.y = app.screen.height / 2;

app.stage.addChild(sprite);

let elapsed = 0.0;

app.ticker.maxFPS = 60;

let player = new Player();
player.scream();

function onClick() {
  elapsed -= 20;
}

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;
  sprite.x = 100.0 + Math.tan(elapsed / 50.0) * 100.0;
  sprite.y = app.screen.height / 2 + Math.sin(elapsed / 10.) * 500;
});
