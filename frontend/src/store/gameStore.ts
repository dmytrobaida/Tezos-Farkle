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
    const api = this.getApi();
    const gameState = await api.getGameState(gameAddress);
    const selectedDices: number[] = [];
    if (gameState.moveStage.toNumber() > 0) {
      selectedDices.push(...this.game.getSelectedDices());
    }
    const newGameState = await api.throwDices(gameAddress, selectedDices);
    runInAction(() => {
      this.game.throwDices(
        newGameState.currentPlayerDices.map((d) => d.toNumber())
      );
      this.currentGame = newGameState;
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
