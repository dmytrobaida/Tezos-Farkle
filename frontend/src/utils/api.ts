import { TezosToolkit } from "@taquito/taquito";

import {
  FarkleGameFactoryState,
  FarkleGameState,
  TezToMutezMultiplier,
} from "./types";

const test: string | undefined = "KT1TivVycy3hsrXF7J3GErv56m3PUZsYeSz1";
const factoryContractAddress =
  test || process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS;

export class GameApi {
  constructor(private tezosToolkit: TezosToolkit) {}

  async createNewGame(bet: number, pointsToWin: number) {
    if (bet <= 0) {
      return [];
    }
    if (pointsToWin <= 0) {
      return [];
    }
    if (factoryContractAddress != null && factoryContractAddress !== "") {
      const contract = await this.tezosToolkit.wallet.at(
        factoryContractAddress
      );
      const operation = await contract.methods
        .createNewGame(bet, pointsToWin)
        .send();
      await operation.confirmation();
      const storage: FarkleGameFactoryState = await contract.storage();
      return storage.activeGames;
    }
  }

  async loadAllGames() {
    if (factoryContractAddress != null && factoryContractAddress !== "") {
      const contract = await this.tezosToolkit.wallet.at(
        factoryContractAddress
      );
      const storage: FarkleGameFactoryState = await contract.storage();
      const gamesWithDetails = await Promise.all(
        (storage.activeGames as string[]).map(async (address) => {
          const contract = await this.tezosToolkit.wallet.at(address);
          const farkleGameState: FarkleGameState = await contract.storage();
          return {
            ...farkleGameState,
            address: address,
          };
        })
      );
      return gamesWithDetails;
    }
  }

  async startNewGame(gameAddress: string, bet: number) {
    if (bet <= 0) {
      return null;
    }
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const operation = await contract.methods
      .startGame()
      .send({ amount: bet * TezToMutezMultiplier, mutez: true });
    await operation.confirmation();
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }

  async throwDices(gameAddress: string, leaveDiceIndexes: number[] = []) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const operation = await contract.methods
      .throwDices(leaveDiceIndexes)
      .send();
    await operation.confirmation();
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }

  async endMove(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const operation = await contract.methods.endMove().send();
    await operation.confirmation();
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }

  async getGameState(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }
}
