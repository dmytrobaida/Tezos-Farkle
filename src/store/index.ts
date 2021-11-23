import { useContext, createContext } from "react";

import { TezosStore } from "./tezosStore";

class RootStore {
  tezosStore: TezosStore = new TezosStore();
}

export const RootStoreContext = createContext<RootStore>(new RootStore());
export const useAppStores = () => useContext(RootStoreContext);
export default RootStore;
