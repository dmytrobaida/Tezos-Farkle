import Phaser from "phaser";
import { Dice } from "./dice";

const onScenePreload = (scene: Phaser.Scene) => {
  scene.load.spritesheet("dice", "./images/dice.png", {
    frameWidth: 100,
    frameHeight: 100,
  });
};

const onSceneCreate = (scene: Phaser.Scene) => {
  return [
    new Dice(scene, 400, 100),
    new Dice(scene, 500, 100),
    new Dice(scene, 600, 100),
    new Dice(scene, 700, 100),
    new Dice(scene, 800, 100),
  ];
};

export class FarkleGame {
  dices: Dice[] = [];

  start(gameWindowId: string) {
    const that = this;

    new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameWindowId,
      width: "100",
      height: "100",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: {
        preload: function () {
          onScenePreload(this);
        },
        create: function () {
          const dices = onSceneCreate(this);
          that.dices.push(...dices)
        },
      },
    });
  }

  throwDices(values: number[]) {
    this.dices.forEach((dice, i) => dice.throwDice(values[i]));
  }
}
