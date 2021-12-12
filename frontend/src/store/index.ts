import { useContext, createContext } from "react";

import { GameStore } from "./gameStore";
import { TezosStore } from "./tezosStore";

const tezosStore: TezosStore = new TezosStore();
const gameStore: GameStore = new GameStore(tezosStore.getApi);

class RootStore {
  tezosStore = tezosStore;
  gameStore = gameStore;
}

export const RootStoreContext = createContext<RootStore>(new RootStore());
export const useAppStores = () => useContext(RootStoreContext);
export default RootStore;
