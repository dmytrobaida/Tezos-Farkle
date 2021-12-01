import { makeAutoObservable, runInAction } from "mobx";
import { TempleWallet } from "@temple-wallet/dapp";
import { TezosToolkit } from "@taquito/taquito";

const tezosRpcUrl = process.env.REACT_APP_TEZOS_RPC_URL;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export class TezosStore {
  address = "";
  balance = "";
  connected = false;
  tezosToolkit!: TezosToolkit;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async connect() {
    if (this.connected) {
      return;
    }
    const available = await TempleWallet.isAvailable();
    if (!available) {
      alert("Temple Wallet not installed");
    }
    const wallet = new TempleWallet("Farkle");
    if (tezosRpcUrl != null) {
      await wallet.connect({
        name: "Local",
        rpc: tezosRpcUrl,
      });
    } else {
      await wallet.connect("granadanet");
    }
    this.tezosToolkit = wallet.toTezos();

    const address = await this.tezosToolkit.wallet.pkh();
    const balance = await this.tezosToolkit.tz.getBalance(address);

    runInAction(() => {
      this.address = address;
      this.balance = balance.toString();
      this.connected = wallet.connected;
    });
  }

  async callContract() {
    if (contractAddress != null) {
      const contract = await this.tezosToolkit.wallet.at(contractAddress);
      const operation = await contract.methods.increment(5).send();
      const result = await operation.confirmation();
    }
  }
}
