import { observer } from "mobx-react-lite";
// @ts-ignore;
import rollADie from "roll-a-die";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";

import {
  PageContainer,
  InfoLine,
  ConnectWalletMenuContainer,
  DicesAnchor,
} from "./styled";

export default observer(() => {
  const { tezosStore } = useAppStores();

  return (
    <PageContainer>
      <ConnectWalletMenuContainer>
        <InfoLine>Address: {tezosStore.address}</InfoLine>
        <InfoLine>Balance: {tezosStore.balance}</InfoLine>
        <BaseButton onClick={tezosStore.connect}>
          {tezosStore.connected ? "Connected" : "Connect"}
        </BaseButton>
      </ConnectWalletMenuContainer>
      {tezosStore.connected && (
        <>
          <DicesAnchor id="dicesContainer" />
          <BaseButton
            style={{
              position: "absolute",
              bottom: "10px",
            }}
            onClick={() => {
              rollADie({
                element: document.getElementById("dicesContainer"),
                numberOfDice: 6,
                soundVolume: 0.3,
                delay: 100000,
                callback: () => {},
              });
            }}
          >
            Roll a dice
          </BaseButton>
        </>
      )}
    </PageContainer>
  );
});
