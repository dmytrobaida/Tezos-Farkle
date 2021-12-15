import React, { useEffect } from "react";
import { GameContainer } from "./styled";

const gameWindowId = "gameWindow";

export const GameScene: React.FC<{
  onStart(gameWindowId: string): void;
}> = ({ onStart }) => {
  useEffect(() => {
    onStart(gameWindowId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <GameContainer id={gameWindowId} />;
};
