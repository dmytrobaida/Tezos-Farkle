import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useAppStores } from "store";

const gameWindowId = "gameWindow";

export const GameScene = observer(() => {
  const { gameStore } = useAppStores();

  useEffect(() => {
    gameStore.startGame(gameWindowId);
  }, [gameStore]);
  return (
    <div
      id={gameWindowId}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
});
