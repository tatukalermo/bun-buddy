"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect, useState } from "react";
import { useGameState } from "@/store/useGameState";
import useGameWebSocketClient from "@/utils/hooks/useGameWebSocketClient";

export default function Home() {
  const { handleClickSendMessage, connectionStatus, messageHistory } =
    useGameWebSocketClient();
  const mapWidth = 5;
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className={`flex flex-col gap-5 w-full max-w-2xl`}>
        <GameMapGrid mapWidth={mapWidth} addUnit={handleClickSendMessage} />
        <ul className="flex flex-col h-32 overflow-y-scroll bg-zinc-100 text-zinc-900 gap-2">
          {messageHistory.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
