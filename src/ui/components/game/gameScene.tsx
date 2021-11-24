import { FarkleGame } from "game";
import { useEffect } from "react";

const gameWindowId = "gameWindow";

export const GameScene = () => {
  useEffect(() => {
    new FarkleGame().start(gameWindowId);
  }, []);
  return (
    <div
      id={gameWindowId}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};
