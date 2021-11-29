import { FarkleGame } from "game";

export class GameStore {
    game: FarkleGame = new FarkleGame();

    startGame(gameWindowId: string) {
        this.game.start(gameWindowId);
    }

    throwDices() {
        const numbers = [
            Phaser.Math.Between(1, 6),
            Phaser.Math.Between(1, 6),
            Phaser.Math.Between(1, 6),
            Phaser.Math.Between(1, 6),
            Phaser.Math.Between(1, 6),
        ];
        this.game.throwDices(numbers);
    }
}