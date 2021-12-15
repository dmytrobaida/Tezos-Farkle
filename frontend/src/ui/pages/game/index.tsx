import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import { GameState } from "utils/types";

import { PageContainer, GameFrame, ResultLine } from "./styled";

const numberToImageMap: { [key: number]: string } = {
  1: "la-dice-one",
  2: "la-dice-two",
  3: "la-dice-three",
  4: "la-dice-four",
  5: "la-dice-five",
  6: "la-dice-six",
};

export default observer(() => {
  const { gameStore, tezosStore } = useAppStores();
  const location = useLocation();
  const navigate = useNavigate();
  const { gameAddress } = location.state || {};
  const pointsMap = useMemo(() => {
    let map: { owner: string; points: number }[] = [];
    let myPoints: { owner: string; points: number } | null = null;
    gameStore.currentGame?.players.forEach((value, key) => {
      if (key === tezosStore.address) {
        myPoints = {
          owner: "Your",
          points: value.toNumber(),
        };
      } else {
        map.push({
          owner: `Player (${key.substring(key.length - 4, key.length)})`,
          points: value.toNumber(),
        });
      }
    });
    if (myPoints != null) {
      map = [myPoints, ...map];
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tezosStore, gameStore, gameStore.currentGame]);

  useEffect(() => {
    if (gameStore.currentGame?.state.toNumber() === GameState.Finished) {
      if (gameStore.currentGame?.winner === tezosStore.address) {
        alert("You won this game! Congratulations!");
      } else {
        alert("Sorry but you lost at this game :(. Try to win next time!");
      }
      navigate("/main", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStore.currentGame, tezosStore.address, navigate]);

  if (gameAddress == null) {
    return <Navigate to={"/main"} replace={true} />;
  }

  return (
    <PageContainer>
      <Window>
        <WindowHeader style={{ textAlign: "center" }}>
          {gameStore.currentGame?.currentPlayer === tezosStore.address ? (
            <span style={{ color: "GreenYellow" }}>Your turn!</span>
          ) : (
            <span style={{ color: "red" }}>Wait for other player's moves!</span>
          )}
        </WindowHeader>
        <Toolbar style={{ justifyContent: "center" }}>
          <List inline>
            {pointsMap.map((p, i) => (
              <ListItem key={i}>
                {p.owner} points: {p.points}
              </ListItem>
            ))}

            <ListItem>
              Move points: {gameStore.currentGame?.movePoints.toNumber()}
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
          </List>
        </Toolbar>
        <WindowContent>
          <GameFrame>
            <GameScene onStart={gameStore.startGame.bind(gameStore)} />
          </GameFrame>
        </WindowContent>
        <Toolbar style={{ justifyContent: "center" }}>
          <Button
            onClick={() => gameStore.throwDices(gameAddress)}
            disabled={
              gameStore.currentGame?.currentPlayer !== tezosStore.address
            }
          >
            Roll dices
          </Button>
          <Bar size={35} />
          <Button
            onClick={() => gameStore.endMove(gameAddress)}
            disabled={gameStore.currentGame?.moveStage.toNumber() === 0}
          >
            End move
          </Button>
          <Bar size={35} />
          <Button onClick={() => gameStore.updateCurrentGame(gameAddress)}>
            <i className="las la-redo-alt" style={{ fontSize: "25px" }}></i>
          </Button>
        </Toolbar>
      </Window>
    </PageContainer>
  );
});
