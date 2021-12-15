import { makeAutoObservable, runInAction } from "mobx";
import { TempleWallet } from "@temple-wallet/dapp";
import { GameApi } from "utils/api";

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
    const tezosRpcName = process.env.REACT_APP_TEZOS_RPC_NAME;
    const tezosRpcUrl = process.env.REACT_APP_TEZOS_RPC_URL;
    
    if (tezosRpcUrl != null && tezosRpcUrl !== "") {
      await wallet.connect({
        name: tezosRpcName || "not_set",
        rpc: tezosRpcUrl,
      });

      const tezosToolkit = wallet.toTezos();
      tezosToolkit.setProvider({
        config: {
          confirmationPollingIntervalSecond: 1,
        },
      });
      const address = await tezosToolkit.wallet.pkh();
      const balance = await tezosToolkit.tz.getBalance(address);

      runInAction(() => {
        this.address = address;
        this.balance = balance.toNumber();
        this.connected = wallet.connected;
        this.api = new GameApi(tezosToolkit);
      });
    }
  }

  getApi = () => this.api;
}
