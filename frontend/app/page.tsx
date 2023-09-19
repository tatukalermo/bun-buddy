"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect } from "react";
import { socket } from "@/utils/webSocketClient";
import { useGameState } from "@/store/useGameState";

export default function Home() {
  const mapWidth = 5;
  const { placeNewUnit } = useGameState();

  /* TODO - massive problem updating the state through this event, 
  useGameState playerUnits array gets filled with duplicates 
  as the event is called multiple times from a single websocke message*/
  useEffect(() => {
    socket.addEventListener("message", (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);
      console.log("anything happened", type, data);
      switch (type) {
        case "USERS_SET":
          return;
        case "GAMESTATE_ADD":
          placeNewUnit(data);
          return;
        case "GAMESTATE_SET":
          placeNewUnit(data[data.length - 1]);
          return;
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
