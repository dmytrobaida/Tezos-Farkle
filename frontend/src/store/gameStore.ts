import { makeAutoObservable, runInAction } from "mobx";

import { FarkleGame } from "game";
import { GameApi } from "utils/api";
import { FarkleGameState, GameState } from "utils/types";

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
    if (
      this.currentGame != null &&
      this.currentGame.currentPlayerDices.length > 0
    ) {
      this.game.initGame(
        this.currentGame.currentPlayerDices.map((d) => d.toNumber())
      );
    } else {
      this.game.initGame([1, 2, 3, 4, 5, 6]);
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
      const diceValues = newGameState.currentPlayerDices.map((d) =>
        d.toNumber()
      );
      this.game.initGame(diceValues);
      this.game.throwDices(diceValues);
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
    const api = this.getApi();
    const gameState = await api.getGameState(gameAddress);
    if (gameState.state.toNumber() >= GameState.Started) {
      runInAction(() => {
        this.currentGame = gameState;
      });
      return;
    }
    const newGameState = await api.startNewGame(
      gameAddress,
      gameState.bet.toNumber()
    );
    runInAction(() => {
      this.currentGame = newGameState;
    });
  }

  async createNewGame() {
    const bet = parseInt(prompt("Enter bet in TEZ", "10") || "10");
    if (isNaN(bet) || bet <= 0) {
      alert("Please enter right value");
      return;
    }
    const pointsToWin = parseInt(
      prompt("Enter max points to win the game", "2000") || "2000"
    );
    if (isNaN(pointsToWin) || pointsToWin <= 0) {
      alert("Please enter right value");
      return;
    }
    await this.getApi()?.createNewGame(bet, pointsToWin);
  }

  async updateCurrentGame(gameAddress: string) {
    const gameState = await this.getApi()?.getGameState(gameAddress);
    runInAction(() => {
      this.currentGame = gameState;
    });
  }
}
