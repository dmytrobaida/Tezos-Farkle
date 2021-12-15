import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableHeadCell,
  TableDataCell,
  Window,
  WindowContent,
  WindowHeader,
  AppBar,
  Toolbar,
  Button,
  Bar,
} from "react95";

import { useAppStores } from "store";
import { parseBalance } from "utils";
import { GameStateMap } from "utils/types";

import { PageContainer, ContentContainer } from "./styled";

export default observer(() => {
  const { tezosStore, gameStore } = useAppStores();
  const navigate = useNavigate();

  useEffect(() => {
    gameStore.loadGames();
  }, [gameStore]);

  const joinGameHandler = useCallback(
    async (gameAddress: string) => {
      await gameStore.joinGame(gameAddress);
      navigate("/game", {
        state: {
          gameAddress: gameAddress,
        },
      });
    },
    [gameStore, navigate]
  );

  const createNewGameHandler = useCallback(async () => {
    await gameStore.createNewGame();
    await gameStore.loadGames();
  }, [gameStore]);

  return (
    <PageContainer>
      <AppBar>
        <Toolbar>
          <Button variant="menu">Address: {tezosStore.address}</Button>
          <Bar size={35} />
          <Button variant="menu">
            Balance: {parseBalance(tezosStore.balance)} TEZ
          </Button>
        </Toolbar>
      </AppBar>
      <ContentContainer>
        <Window>
          <WindowHeader>All games</WindowHeader>
          <Toolbar style={{ justifyContent: "flex-end" }}>
            <Button onClick={createNewGameHandler}>Create new</Button>
            <Button onClick={gameStore.loadGames}>
              <i className="las la-redo-alt" style={{ fontSize: "25px" }}></i>
            </Button>
          </Toolbar>
          <WindowContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Contract address</TableHeadCell>
                  <TableHeadCell>Creator address</TableHeadCell>
                  <TableHeadCell>Bet</TableHeadCell>
                  <TableHeadCell>Points to win</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gameStore.allGames.map((game, i) => (
                  <TableRow key={i}>
                    <TableDataCell>{game.id.toNumber()}</TableDataCell>
                    <TableDataCell>{game.address}</TableDataCell>
                    <TableDataCell>{game.creator}</TableDataCell>
                    <TableDataCell>{game.bet.toNumber()} TEZ</TableDataCell>
                    <TableDataCell>{game.pointsToWin.toNumber()}</TableDataCell>
                    <TableDataCell>
                      {GameStateMap[game.state.toNumber()]}
                    </TableDataCell>
                    <TableHeadCell
                      style={{ cursor: "pointer" }}
                      onClick={() => joinGameHandler(game.address)}
                    >
                      Join game
                    </TableHeadCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </WindowContent>
        </Window>
      </ContentContainer>
    </PageContainer>
  );
});
