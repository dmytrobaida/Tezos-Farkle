import { observer } from "mobx-react-lite";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";
import { GameScene } from "ui/components/game/gameScene";

import {
  PageContainer,
  InfoLine,
  ConnectWalletMenuContainer,
  GameFrame,
} from "./styled";

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
            right: "0",
          }}
          onClick={tezosStore.connect}
        >
          {tezosStore.connected ? "Connected" : "Connect"}
        </BaseButton>
      </ConnectWalletMenuContainer>
      <GameFrame>
        <GameScene />
        <BaseButton
          style={{
            position: "absolute",
            bottom: "10px",
          }}
        >
          Roll a dice
        </BaseButton>
      </GameFrame>
    </PageContainer>
  );
});
