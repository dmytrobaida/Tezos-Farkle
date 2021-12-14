import { MichelsonMap } from "@taquito/taquito";
import { BigNumber } from "bignumber.js";

export interface FarkleGameState {
  address: string;
  creator: string;
  state: BigNumber;
  seed: BigNumber;
  currentPlayer: string;
  moveStage: BigNumber;
  movePoints: BigNumber;
  winner: string;
  currentPlayerDices: BigNumber[];
  currentPlayerLeavedDices: BigNumber[];
  bet: BigNumber;
  players: MichelsonMap<string, BigNumber>;
}

export interface FarkleGameFactoryState {
  activeGames: string[];
  inactiveGames: string[];
}

export const GameState = {
  Created: 0,
  PlayerJoined: 1,
  Started: 2,
  Finished: 3,
};

export const GameStateMap: { [key: number]: string } = {
  0: "Created",
  1: "PlayerJoined",
  2: "Started",
  3: "Finished",
};

export const TezToMutezMultiplier = 1000000;
