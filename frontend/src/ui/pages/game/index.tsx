import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";
import { GameScene } from "ui/components/game/gameScene";

import { PageContainer, GameFrame } from "./styled";

export default observer(() => {
  const { gameStore } = useAppStores();
  const location = useLocation();
  const { gameAddress } = location.state || {};

  if (gameAddress == null) {
    return <Navigate to={"/main"} replace={true} />;
  }

  return (
    <PageContainer>
      <GameFrame>
        <GameScene onStart={gameStore.startGame.bind(gameStore)} />
        <BaseButton
          style={{
            position: "absolute",
            bottom: "10px",
          }}
          onClick={() => gameStore.throwDices(gameAddress)}
        >
          Roll a dice
        </BaseButton>
      </GameFrame>
    </PageContainer>
  );
});
