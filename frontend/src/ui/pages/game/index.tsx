import { observer } from "mobx-react-lite";

import { BaseButton } from "ui/components";
import { useAppStores } from "store";
import { GameScene } from "ui/components/game/gameScene";

import {
  PageContainer,
  GameFrame,
} from "./styled";

export default observer(() => {
  const { gameStore } = useAppStores();

  return (
    <PageContainer>
      <GameFrame>
        <GameScene onStart={gameStore.startGame.bind(gameStore)} />
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
