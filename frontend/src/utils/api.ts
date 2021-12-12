import { TezosToolkit } from "@taquito/taquito";

const test: string | undefined = "KT1DEwMmcC9TqzpPp76qXMkUvKMu1EZPSptL";
const factoryContractAddress = test || process.env.REACT_APP_FACTORY_CONTRACT_ADDRESS;

export class GameApi {
  constructor(private tezosToolkit: TezosToolkit) {}

  async createNewGame() {
    if (factoryContractAddress != null && factoryContractAddress !== "") {
      const contract = await this.tezosToolkit.wallet.at(
        factoryContractAddress
      );
      const operation = await contract.methods.createNewGame().send();
      await operation.confirmation();
      const storage: any = await contract.storage();
      return storage.activeGames;
    }
  }

  async loadAllGames() {
    if (factoryContractAddress != null && factoryContractAddress !== "") {
      const contract = await this.tezosToolkit.wallet.at(
        factoryContractAddress
      );
      const storage: any = await contract.storage();
      const gamesWithDetails = await Promise.all(
        (storage.activeGames as string[]).map(async (game) => {
          const contract = await this.tezosToolkit.wallet.at(game);
          const storage: any = await contract.storage();
          return {
            address: game,
            ...storage,
          };
        })
      );
      return gamesWithDetails as any[];
    }
  }

  async startNewGame(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const operation = await contract.methods.startGame().send();
    await operation.confirmation();
    const st = await contract.storage();
  }

  async throwDices(gameAddress: string) {
    const contract = await this.tezosToolkit.wallet.at(gameAddress);
    const operation = await contract.methods.throwDices().send();
    await operation.confirmation();
    const st: any = await contract.storage();
    return st.dices.map((dice: any) => dice.toNumber()) as number[];
  }
}
