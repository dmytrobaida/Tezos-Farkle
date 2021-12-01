import { useContext, createContext } from "react";
import { GameStore } from "./gameStore";

import { TezosStore } from "./tezosStore";

class RootStore {
  tezosStore: TezosStore = new TezosStore();
  gameStore: GameStore = new GameStore();
}

export const RootStoreContext = createContext<RootStore>(new RootStore());
export const useAppStores = () => useContext(RootStoreContext);
export default RootStore;
