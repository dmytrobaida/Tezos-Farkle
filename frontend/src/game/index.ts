import Phaser from "phaser";
import { Dice } from "./dice";

const onScenePreload = (scene: Phaser.Scene) => {
  scene.load.spritesheet("dice", "./images/dice2.png", {
    frameWidth: 96,
    frameHeight: 96,
  });
};

const onSceneCreate = (
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

  private toggleDice = (index: number) => {
    if (this.selectedDices[index]) {
      this.selectedDices[index] = false;
    } else {
      this.selectedDices[index] = true;
    }
  };

  start(gameWindowId: string) {
    const that = this;

    return new Promise<void>(
      (resolve) =>
        new Phaser.Game({
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
              const dices = onSceneCreate(this, 6, that.toggleDice.bind(that));
              dices.forEach((dice, i) => {
                that.dices.push(dice);
                if (i !== 0) {
                  Phaser.Display.Align.In.RightCenter(
                    dice.sprite,
                    dices[i - 1].sprite,
                    100
                  );
                }
              });
              resolve();
            },
          },
        })
    );
  }

  throwDices(values: number[]) {
    this.dices.forEach((dice, i) => dice.throwDice(values[i]));
  }

  setDiceValues(values: number[]) {
    for (let i = 0; i < values.length; i++) {
      this.dices[i]?.sprite.setFrame(values[i] === 0 ? 0 : values[i] - 1);
    }
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
