import { makeAutoObservable, runInAction } from "mobx";

import { FarkleGame } from "game";
import { GameApi } from "utils/api";

type GetApiFn = () => GameApi;
export class GameStore {
  game: FarkleGame = new FarkleGame();
  allGames: any[] = [];

  constructor(private getApi: GetApiFn) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  startGame(gameWindowId: string) {
    this.game.start(gameWindowId);
  }

  async throwDices(gameAddress: string) {
    const dices = await this.getApi()?.throwDices(gameAddress);
    this.game.throwDices(dices);
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
    await this.getApi()?.startNewGame(gameAddress);
  }

  async createNewGame() {
    await this.getApi()?.createNewGame();
  }
}
