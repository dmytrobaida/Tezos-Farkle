import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";

import { PageContainer } from "./styled";

export default observer(() => {
  const { tezosStore } = useAppStores();
  const location = useLocation();
  const navigate = useNavigate();

  const connectHandler = useCallback(async () => {
    await tezosStore.connect();
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }, [location, navigate]);

  return (
    <PageContainer>
      <BaseButton onClick={connectHandler}>Connect</BaseButton>
    </PageContainer>
  );
});
