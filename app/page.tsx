"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect } from "react";
import { socket } from "@/utils/webSocketClient";
import { useGameState } from "@/store/useGameState";

export default function Home() {
  const mapWidth = 5;
  const { player, placeNewUnit, playerConnected, updateGameState } =
    useGameState();

  useEffect(() => {
    socket.addEventListener("message", (event: MessageEvent) => {
      const wsClient = JSON.parse(event.data);
      console.log(wsClient);
      
      switch (wsClient.type) {
        case "USERS_SET":
          const dataIndex = wsClient.data.length === 1 ? 0 : 1;
          const playerSide = dataIndex === 0 ? "player1" : "player2";
          const username = wsClient.data[dataIndex].username;
          console.log("new user added!", playerSide, username);
          playerConnected(username, playerSide);
          break;
        case "GAMESTATE_ADD":
          console.log("opponent placed piece", wsClient.data);
          placeNewUnit(wsClient.data);
          break;
        case "GAMESTATE_SET":
          console.log("set updated state", wsClient.data);
          updateGameState(wsClient.data);
          break;
      }
    });
    return () => {};
  });

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className={`flex flex-col gap-5 w-full max-w-2xl`}>
        <GameMapGrid mapWidth={mapWidth} />

        <div
          className={`flex flex-col w-9/12 bg-slate-300 text-slate-900 rounded border-4 p-2
        ${player.side === "player1" ? "border-white" : "border-black"}`}
        >
          <span >{player.side}</span>
          <span className="text-lg font-bold">{player.username}</span>
        </div>
      </div>
    </main>
  );
}
