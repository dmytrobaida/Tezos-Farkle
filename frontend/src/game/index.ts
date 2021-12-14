import Phaser from "phaser";
import { Dice } from "./dice";

const onScenePreload = (scene: Phaser.Scene) => {
  scene.load.spritesheet("dice", "./images/dice2.png", {
    frameWidth: 96,
    frameHeight: 96,
  });
};

const createDices = (
  scene: Phaser.Scene,
  diceCount: number,
  onClick: (index: number) => void
) => {
  const { width, height } = scene.sys.canvas;
  const dices = [];
  for (let i = 0; i < diceCount; i++) {
    if (i === 0) {
      dices.push(
        new Dice(scene, width / 2 - (diceCount * 50 - 50), height / 2, () =>
          onClick(0)
        )
      );
    } else {
      dices.push(new Dice(scene, 0, 0, () => onClick(i)));
    }
  }
  return dices;
};

export class FarkleGame {
  private dices: Dice[] = [];
  private selectedDices: { [key: number]: boolean } = {};
  private game!: Phaser.Game;

  private toggleDice = (index: number) => {
    if (this.selectedDices[index]) {
      this.selectedDices[index] = false;
    } else {
      this.selectedDices[index] = true;
    }
  };

  start(gameWindowId: string) {
    return new Promise<void>((resolve) => {
      this.game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: gameWindowId,
        width: "100",
        height: "100",
        transparent: true,
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
            resolve();
          },
        },
      });
    });
  }

  initGame(values: number[]) {
    this.selectedDices = {};
    const scene = this.game.scene.getAt(0);
    if (scene != null) {
      if (this.dices.length > 0) {
        this.dices.forEach((dice) => dice.sprite.destroy());
        this.dices = [];
      }
      const dices = createDices(
        scene,
        values.length,
        this.toggleDice.bind(this)
      );
      dices.forEach((dice, i) => {
        this.dices.push(dice);
        if (i !== 0) {
          Phaser.Display.Align.In.RightCenter(
            dice.sprite,
            dices[i - 1].sprite,
            100
          );
        }
        dice.sprite.setFrame(values[i] === 0 ? 0 : values[i] - 1);
      });
    }
  }

  throwDices(values: number[]) {
    this.dices.forEach((dice, i) => dice.throwDice(values[i]));
  }

  getSelectedDices() {
    const selectedDices: number[] = [];
    for (const index in this.selectedDices) {
      if (this.selectedDices[index]) {
        selectedDices.push(+index);
      }
    }
    return selectedDices;
  }
}
