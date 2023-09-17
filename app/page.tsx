"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect } from "react";
import { socket } from "@/utils/webSocketClient";
import { useGameState } from "@/store/useGameState";

export default function Home() {
  const { placeNewUnit } = useGameState();
  
  useEffect(() => {
    socket.addEventListener("message", (event: MessageEvent) => {
      const wsClient = JSON.parse(event.data);
      switch (wsClient.type) {
        case "USERS_SET":
          console.log(
            "new user added! ",
            wsClient.data.find((user: { username: string }) => !!user.username)
              .username
          );
          break;
        case "GAMESTATE_ADD":
          console.log("piece placed", wsClient.data);
          placeNewUnit(wsClient.data.gameState);
          break;
      }
    });
    return () => {};
  });

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <GameMapGrid mapWidth={5} />
    </main>
  );
}
