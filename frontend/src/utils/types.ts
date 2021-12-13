import { BigNumber } from "bignumber.js";

export interface FarkleGameState {
  address: string;
  creator: string;
  state: BigNumber;
  seed: BigNumber;
  player1: string;
  player2: string;
  player1Points: BigNumber;
  player2Points: BigNumber;
  currentPlayer: BigNumber;
  moveStage: BigNumber;
  movePoints: BigNumber;
  winner: string;
  currentPlayerDices: BigNumber[];
  currentPlayerLeavedDices: BigNumber[];
}

export interface FarkleGameFactoryState {
  activeGames: string[];
  inactiveGames: string[];
}

export const GameState: { [key: number]: string } = {
  0: "Created",
  1: "PlayerJoined",
  2: "Started",
  3: "Finished",
};
