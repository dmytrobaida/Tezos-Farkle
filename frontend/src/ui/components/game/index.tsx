import React, { useEffect } from "react";
import { GameContainer } from "./styled";

const gameWindowId = "gameWindow";

export const GameScene: React.FC<{
  onStart(gameWindowId: string): void;
}> = ({ onStart }) => {
  useEffect(() => {
    onStart(gameWindowId);
  }, []);
  return <GameContainer id={gameWindowId} />;
};
