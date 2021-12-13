import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppStores } from "store";
import { GameState } from "utils/types";

import {
  PageContainer,
  InfoLine,
  HeaderContainer,
  ContentContainer,
  AllGamesTable,
} from "./styled";

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
      <HeaderContainer>
        <InfoLine>Address: {tezosStore.address}</InfoLine>
        <InfoLine>Balance: {tezosStore.balance}</InfoLine>
      </HeaderContainer>
      <ContentContainer>
        <AllGamesTable>
          <thead>
            <tr>
              <th>Contract address</th>
              <th>Creator address</th>
              <th>Status</th>
              <th>
                <button onClick={createNewGameHandler}>Create new</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {gameStore.allGames.map((game, i) => (
              <tr key={i}>
                <td>{game.address}</td>
                <td>{game.creator}</td>
                <td>{GameState[game.state.toNumber()]}</td>
                <td>
                  <button onClick={() => joinGameHandler(game.address)}>
                    Join game
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </AllGamesTable>
      </ContentContainer>
    </PageContainer>
  );
});
