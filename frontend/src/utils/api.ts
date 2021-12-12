import { TezosToolkit } from "@taquito/taquito";

const factoryContractAddress = process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS;

export class GameApi {
  constructor(private tezosToolkit: TezosToolkit) {}

  async createNewGame() {
    if (factoryContractAddress != null && factoryContractAddress !== "") {
      const contract = await this.tezosToolkit.wallet.at(
        factoryContractAddress
      );
      await contract.methods.createNewGame().send();
      const gamesList = await contract.storage();
      return gamesList;
    }
  }

  async startNewGame(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    await contract.methods.startGame().send();
    const st = await contract.storage();
  }

  async throwDices(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    await contract.methods.throwDices().send();
    const st = await contract.storage();
  }
}
