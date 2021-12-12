import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";

import { useAppStores } from "store";

export const AuthProtector: React.FC<{
  children: JSX.Element;
}> = observer(({ children }) => {
  const { tezosStore } = useAppStores();
  const location = useLocation();

  if (!tezosStore.connected) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
});
