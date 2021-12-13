import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAppStores } from "store";
import { GameScene } from "ui/components";
import { FarkleGameState } from "utils/types";

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

const sortGamersInfo = (
  myAddress: string,
  gameState: FarkleGameState | null
) => {
  if (gameState == null) {
    return null;
  }
  if (myAddress === gameState.player1) {
    return {
      me: {
        points: gameState.player1Points,
      },
      other: {
        points: gameState.player2Points,
      },
    };
  }
  return {
    me: {
      points: gameState.player2Points,
    },
    other: {
      points: gameState.player1Points,
    },
  };
};

export default observer(() => {
  const { gameStore, tezosStore } = useAppStores();
  const location = useLocation();
  const { gameAddress } = location.state || {};
  const gamersInfos = useMemo(
    () => sortGamersInfo(tezosStore.address, gameStore.currentGame),
    []
  );

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
        <InfoLine>Total: {gamersInfos?.me.points.toNumber()} points</InfoLine>
        <InfoLine>
          Current: {gameStore.currentGame?.movePoints.toNumber()} points
        </InfoLine>
        <ResultLine>
          {gameStore.currentGame?.currentPlayerLeavedDices.map((dice, i) => (
            <i
              key={i}
              className={"las " + numberToImageMap[dice.toNumber()]}
            ></i>
          ))}
        </ResultLine>
      </Player1ThrowsContainer>
      <Player2ThrowsContainer>
        <InfoLineHeader>Guest</InfoLineHeader>
        <InfoLine>
          Total: {gamersInfos?.other.points.toNumber()} points
        </InfoLine>
        <InfoLine>
          Current: {gameStore.currentGame?.movePoints.toNumber()} points
        </InfoLine>
        <ResultLine>
          {gameStore.currentGame?.currentPlayerLeavedDices.map((dice, i) => (
            <i
              key={i}
              className={"las " + numberToImageMap[dice.toNumber()]}
            ></i>
          ))}
        </ResultLine>
      </Player2ThrowsContainer>
      <ControlsContainer>
        <ControlButton onClick={() => gameStore.throwDices(gameAddress)}>
          Roll dices
        </ControlButton>
        <ControlButton onClick={() => gameStore.endMove(gameAddress)}>
          End move
        </ControlButton>
      </ControlsContainer>
    </PageContainer>
  );
});
