import { makeAutoObservable, runInAction } from "mobx";
import { TempleWallet } from "@temple-wallet/dapp";

export class TezosStore {
  address = "";
  balance = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async connect() {
    const available = await TempleWallet.isAvailable();
    if (!available) {
      throw new Error("Temple Wallet not installed");
    }
    const wallet = new TempleWallet("Farkle");
    await wallet.connect("granadanet");
    const tezos = wallet.toTezos();

    const address = await tezos.wallet.pkh();
    const balance = await tezos.tz.getBalance(address);

    runInAction(() => {
      this.address = address;
      this.balance = balance.toNumber();
    });
  }
}
