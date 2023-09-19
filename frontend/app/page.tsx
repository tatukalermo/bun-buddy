"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect } from "react";
import { socket } from "@/utils/webSocketClient";
import { useGameState } from "@/store/useGameState";
import PlayerInfo from "@/components/PlayerInfo";

export default function Home() {
  const mapWidth = 5;
  const { placeNewUnit, updateGameState } = useGameState();

  useEffect(() => {
    socket.addEventListener("message", (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);
      console.log("anything happened", type, data);

      switch (type) {
        case "USERS_SET":
          console.log("new user added!", data[data.length - 1]);
          break;
        case "GAMESTATE_ADD":
          console.log("opponent placed piece", data);
          placeNewUnit(data);
          break;
        case "GAMESTATE_SET":
          console.log("set updated state", data);
          updateGameState(data);
          break;
      }
    });
    return () => {};
  });

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className={`flex flex-col gap-5 w-full max-w-2xl`}>
        <GameMapGrid mapWidth={mapWidth} />
      </div>
    </main>
  );
}
