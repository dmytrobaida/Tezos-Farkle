import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from "react-router-dom";

import { useAppStores } from "store";
import { GameScene } from "ui/components";

import {
  PageContainer,
  GameFrame,
  Player1ThrowsContainer,
  Player2ThrowsContainer,
  InfoLine,
  ResultLine,
  InfoLineHeader,
  ControlsContainer,
  ControlButton,
} from "./styled";

const numberToImageMap: { [key: number]: string } = {
  1: "la-dice-one",
  2: "la-dice-two",
  3: "la-dice-three",
  4: "la-dice-four",
  5: "la-dice-five",
  6: "la-dice-six",
};

const dices = [1, 2, 3, 4, 5, 6];

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
      </GameFrame>
      <Player1ThrowsContainer>
        <InfoLineHeader>You</InfoLineHeader>
        <InfoLine>Total: 0 points</InfoLine>
        <InfoLine>Current: 0 points</InfoLine>
        <ResultLine>
          {dices.map((dice, i) => (
            <i key={i} className={"las " + numberToImageMap[dice]}></i>
          ))}
        </ResultLine>
      </Player1ThrowsContainer>
      <Player2ThrowsContainer>
        <InfoLineHeader>Guest</InfoLineHeader>
        <InfoLine>Total: 0 points</InfoLine>
        <InfoLine>Current: 0 points</InfoLine>
        <ResultLine>
          {dices.map((dice, i) => (
            <i key={i} className={"las " + numberToImageMap[dice]}></i>
          ))}
        </ResultLine>
      </Player2ThrowsContainer>
      <ControlsContainer>
        <ControlButton onClick={() => gameStore.throwDices(gameAddress)}>
          Roll dices
        </ControlButton>
        <ControlButton onClick={() => gameStore.throwDices(gameAddress)}>
          End move
        </ControlButton>
      </ControlsContainer>
    </PageContainer>
  );
});
