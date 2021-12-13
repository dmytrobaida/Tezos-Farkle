import Phaser from "phaser";
import { Dice } from "./dice";

const onScenePreload = (scene: Phaser.Scene) => {
  scene.load.spritesheet("dice", "./images/dice.png", {
    frameWidth: 100,
    frameHeight: 100,
  });
};

const onSceneCreate = (scene: Phaser.Scene) => {
  const { width, height } = scene.sys.canvas;
  return [
    new Dice(scene, width / 2 - 250, height / 2),
    new Dice(scene, 0, 0),
    new Dice(scene, 0, 0),
    new Dice(scene, 0, 0),
    new Dice(scene, 0, 0),
    new Dice(scene, 0, 0),
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
          dices.forEach((dice, i) => {
            that.dices.push(dice);
            if (i != 0) {
              Phaser.Display.Align.In.RightCenter(
                dice.sprite,
                dices[i - 1].sprite,
                100
              );
            }
          });
        },
      },
    });
  }

  throwDices(values: number[]) {
    this.dices.forEach((dice, i) => dice.throwDice(values[i]));
  }
}
