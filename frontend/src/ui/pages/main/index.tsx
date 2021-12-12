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
  const { tezosStore, gameStore } = useAppStores();

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
        {tezosStore.connected && (
          <BaseButton
            style={{
              position: "absolute",
              left: "0",
            }}
            onClick={tezosStore.api.createNewGame}
          >
            Call contract
          </BaseButton>
        )}
      </ConnectWalletMenuContainer>
      <GameFrame>
        <GameScene />
        <BaseButton
          style={{
            position: "absolute",
            bottom: "10px",
          }}
          onClick={() => gameStore.throwDices()}
        >
          Roll a dice
        </BaseButton>
      </GameFrame>
    </PageContainer>
  );
});
