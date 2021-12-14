import { TezosToolkit } from "@taquito/taquito";

import { FarkleGameFactoryState, FarkleGameState } from "./types";

const test: string | undefined = "KT19ARHPtcBsgBs55obUSE2FzMXZ7QcQNoBz";
const factoryContractAddress =
  test || process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS;

export class GameApi {
  constructor(private tezosToolkit: TezosToolkit) {}

  async createNewGame() {
    if (factoryContractAddress != null && factoryContractAddress !== "") {
      const contract = await this.tezosToolkit.wallet.at(
        factoryContractAddress
      );
      const operation = await contract.methods.createNewGame().send();
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

  async startNewGame(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const operation = await contract.methods.startGame().send();
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
