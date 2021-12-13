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
import { GameState } from "utils/types";

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
          <Button variant="menu">Balance: {tezosStore.balance}</Button>
        </Toolbar>
      </AppBar>
      <ContentContainer>
        <Window>
          <WindowHeader>All games</WindowHeader>
          <WindowContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Contract address</TableHeadCell>
                  <TableHeadCell>Creator address</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell
                    style={{ cursor: "pointer" }}
                    onClick={createNewGameHandler}
                  >
                    Create new
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gameStore.allGames.map((game, i) => (
                  <TableRow key={i}>
                    <TableDataCell>{game.address}</TableDataCell>
                    <TableDataCell>{game.creator}</TableDataCell>
                    <TableDataCell>
                      {GameState[game.state.toNumber()]}
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
