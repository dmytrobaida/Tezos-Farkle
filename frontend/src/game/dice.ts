import Phaser from "phaser";

const random = new Phaser.Math.RandomDataGenerator();

export class Dice {
  sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, onClick: () => void) {
    this.sprite = scene.physics.add.sprite(x, y, "dice");
    this.sprite.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(0, 0, 96, 96),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
    });

    this.sprite.on("pointerover", () => {
      this.sprite.alpha = 0.5;
    });

    this.sprite.on("pointerout", () => {
      this.sprite.alpha = 1;
    });

    this.sprite.on("pointerdown", () => {
      onClick();
      if (this.sprite.isTinted) {
        this.sprite.clearTint();
      } else {
        this.sprite.setTint(0xff0000);
      }
    });
  }

  throwDice(n: number) {
    const randomArr = random.shuffle([
      0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4,
    ]);
    randomArr.push(n - 1);

    this.sprite.anims.remove("roll");
    this.sprite.anims.create({
      key: "roll",
      frames: this.sprite.anims.generateFrameNumbers("dice", {
        start: 0,
        end: 5,
        frames: randomArr,
      }),
      frameRate: 15,
    });

    this.sprite.play("roll");
  }

  getSprite() {
    return this.sprite;
  }
}
