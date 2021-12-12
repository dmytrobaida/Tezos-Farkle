import React, { useEffect } from "react";

const gameWindowId = "gameWindow";

export const GameScene: React.FC<{
  onStart(gameWindowId: string): void;
}> = ({ onStart }) => {
  useEffect(() => {
    onStart(gameWindowId);
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
