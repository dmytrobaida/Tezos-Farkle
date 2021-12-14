import { makeAutoObservable, runInAction } from "mobx";
import { TempleWallet } from "@temple-wallet/dapp";
import { GameApi } from "utils/api";

const tezosRpcUrl = process.env.REACT_APP_TEZOS_RPC_URL;

export class TezosStore {
  address = "";
  balance = 0;
  connected = false;
  api!: GameApi;

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
    if (tezosRpcUrl != null && tezosRpcUrl !== "") {
      await wallet.connect({
        name: "Local",
        rpc: tezosRpcUrl,
      });
    } else {
      await wallet.connect("granadanet");
    }

    const tezosToolkit = wallet.toTezos();
    const address = await tezosToolkit.wallet.pkh();
    const balance = await tezosToolkit.tz.getBalance(address);

    runInAction(() => {
      this.address = address;
      this.balance = balance.toNumber();
      this.connected = wallet.connected;
      this.api = new GameApi(tezosToolkit);
    });
  }

  getApi = () => this.api;
}
