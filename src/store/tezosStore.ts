import { makeAutoObservable, runInAction } from "mobx";
import { TempleWallet } from "@temple-wallet/dapp";

export class TezosStore {
  address = "";
  balance = "";
  connected = false;

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
    await wallet.connect("granadanet");
    const tezos = wallet.toTezos();

    const address = await tezos.wallet.pkh();
    const balance = await tezos.tz.getBalance(address);

    runInAction(() => {
      this.address = address;
      this.balance = balance.toString();
      this.connected = wallet.connected;
    });
  }
}
