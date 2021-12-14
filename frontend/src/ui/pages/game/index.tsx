import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  Window,
  WindowContent,
  WindowHeader,
  List,
  ListItem,
  Button,
  Toolbar,
  Bar,
} from "react95";

import { useAppStores } from "store";
import { GameScene } from "ui/components";
import { FarkleGameState } from "utils/types";

import { PageContainer, GameFrame, ResultLine } from "./styled";

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
    [tezosStore, gameStore]
  );

  if (gameAddress == null) {
    return <Navigate to={"/main"} replace={true} />;
  }

  return (
    <PageContainer>
      <Window>
        <WindowHeader>Farkle!</WindowHeader>
        <Toolbar style={{ justifyContent: "center" }}>
          <List inline>
            <ListItem>
              Your points: {gamersInfos?.me.points.toNumber()}
            </ListItem>
            <ListItem>
              Current move points:{" "}
              {gameStore.currentGame?.movePoints.toNumber()}
            </ListItem>
            {(gameStore.currentGame?.currentPlayerLeavedDices?.length || 0) >
              0 && (
              <ListItem>
                <ResultLine>
                  {gameStore.currentGame?.currentPlayerLeavedDices.map(
                    (dice, i) => (
                      <i
                        key={i}
                        className={"las " + numberToImageMap[dice.toNumber()]}
                      ></i>
                    )
                  )}
                </ResultLine>
              </ListItem>
            )}
            <ListItem>
              Other player points: {gamersInfos?.other.points.toNumber()}
            </ListItem>
          </List>
        </Toolbar>
        <WindowContent>
          <GameFrame>
            <GameScene onStart={gameStore.startGame.bind(gameStore)} />
          </GameFrame>
        </WindowContent>
        <Toolbar style={{ justifyContent: "center" }}>
          <Button onClick={() => gameStore.throwDices(gameAddress)}>
            Roll dices
          </Button>
          <Bar size={35} />
          <Button
            onClick={() => gameStore.endMove(gameAddress)}
            disabled={gameStore.currentGame?.moveStage.toNumber() === 0}
          >
            End move
          </Button>
        </Toolbar>
      </Window>
    </PageContainer>
  );
});
