import {
  ContractAbstraction,
  SendParams,
  TezosToolkit,
  Wallet,
} from "@taquito/taquito";

import {
  FarkleGameFactoryState,
  FarkleGameState,
  TezToMutezMultiplier,
} from "./types";

const factoryContractAddress = process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS;
export class GameApi {
  constructor(private tezosToolkit: TezosToolkit) {}

  private async callApiMethod(
    contract: ContractAbstraction<Wallet>,
    methodName: string,
    params: Partial<SendParams> | undefined,
    ...args: any[]
  ) {
    try {
      const operation = await contract.methods[methodName](...args).send({
        fee: 1000000,
        ...params,
      });
      await operation.confirmation(1);
      return operation;
    } catch (err: any) {
      alert(err.message);
      throw err;
    }
  }

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
      await this.callApiMethod(
        contract,
        "createNewGame",
        {
          fee: 10000000,
          storageLimit: 100000,
        },
        bet,
        pointsToWin
      );
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
      const orderedGames = gamesWithDetails.sort(
        (a, b) => a.id.toNumber() - b.id.toNumber()
      );
      return orderedGames;
    }
  }

  async startNewGame(gameAddress: string, bet: number) {
    if (bet <= 0) {
      return null;
    }
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    await this.callApiMethod(contract, "startGame", {
      amount: bet * TezToMutezMultiplier,
      mutez: true,
    });

    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }

  async throwDices(gameAddress: string, leaveDiceIndexes: number[] = []) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    await this.callApiMethod(contract, "throwDices", {}, leaveDiceIndexes);
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }

  async endMove(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    await this.callApiMethod(contract, "endMove", {});
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }

  async getGameState(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const farkleGameState: FarkleGameState = await contract.storage();
    return farkleGameState;
  }
}
