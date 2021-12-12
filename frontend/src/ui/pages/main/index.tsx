import { observer } from "mobx-react-lite";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";

import { PageContainer, InfoLine, ConnectWalletMenuContainer } from "./styled";

export default observer(() => {
  const { tezosStore } = useAppStores();

  return (
    <PageContainer>
      <ConnectWalletMenuContainer>
        <InfoLine>Address: {tezosStore.address}</InfoLine>
        <InfoLine>Balance: {tezosStore.balance}</InfoLine>
        <BaseButton
          style={{
            position: "absolute",
            left: "0",
          }}
          onClick={tezosStore.api.createNewGame}
        >
          Call contract
        </BaseButton>
      </ConnectWalletMenuContainer>
    </PageContainer>
  );
});
