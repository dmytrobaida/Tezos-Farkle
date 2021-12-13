import { makeAutoObservable, runInAction } from "mobx";

import { FarkleGame } from "game";
import { GameApi } from "utils/api";
import { FarkleGameState } from "utils/types";

type GetApiFn = () => GameApi;
export class GameStore {
  game: FarkleGame = new FarkleGame();
  allGames: FarkleGameState[] = [];
  currentGame: FarkleGameState | null = null;

  constructor(private getApi: GetApiFn) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async startGame(gameWindowId: string) {
    await this.game.start(gameWindowId);
    if (this.currentGame != null) {
      this.game.setDiceValues(
        this.currentGame.currentPlayerDices.map((d) => d.toNumber())
      );
    }
  }

  async throwDices(gameAddress: string) {
    const gameState = await this.getApi()?.throwDices(gameAddress);
    runInAction(() => {
      this.game.throwDices(
        gameState.currentPlayerDices.map((d) => d.toNumber())
      );
      this.currentGame = gameState;
    });
  }

  async endMove(gameAddress: string) {
    const gameState = await this.getApi()?.endMove(gameAddress);
    runInAction(() => {
      this.currentGame = gameState;
    });
  }

  async loadGames() {
    const games = await this.getApi()?.loadAllGames();
    runInAction(() => {
      if (games != null) {
        this.allGames = games;
      }
    });
  }

  async joinGame(gameAddress: string) {
    const gameState = await this.getApi()?.startNewGame(gameAddress);
    runInAction(() => {
      this.currentGame = gameState;
    });
  }

  async createNewGame() {
    await this.getApi()?.createNewGame();
  }
}
