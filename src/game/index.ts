import Phaser from "phaser";

export class FarkleGame {
  start(gameWindowId: string) {
    new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameWindowId,
      width: "100",
      height: "100",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 900 },
        },
      },
      scene: {
        preload: function () {
          this.load.setBaseURL("https://labs.phaser.io");

          this.load.image("logo", "assets/sprites/phaser3-logo.png");
          this.load.image("red", "assets/particles/red.png");
        },
        create: function () {
          const particles = this.add.particles("red");

          const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: "ADD",
          });

          const logo = this.physics.add.image(400, 100, "logo");

          logo.setVelocity(100, 200);
          logo.setBounce(1, 1);
          logo.setCollideWorldBounds(true);

          emitter.startFollow(logo);
        },
      },
    });
  }
}
