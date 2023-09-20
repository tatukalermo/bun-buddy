"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect, useRef } from "react";
import useGameWebSocketClient from "@/utils/hooks/useGameWebSocketClient";

export default function Home() {
  // WebSocket functions passed down as props to avoid multiple clients listening to WS
  const { handleClickSendMessage, messageHistory } =
    useGameWebSocketClient();
  const mapWidth = 5;
  const gameLogRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Scroll to most recent game log entry
    if (gameLogRef.current) {
      gameLogRef.current.scrollTop = gameLogRef.current.scrollHeight;
    }
  }, [messageHistory]);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className={`flex flex-col gap-5 w-full max-w-2xl`}>
        <GameMapGrid mapWidth={mapWidth} addUnit={handleClickSendMessage} />
        <ul
          ref={gameLogRef}
          className="flex flex-col h-32 overflow-y-scroll bg-zinc-100 text-zinc-900 gap-2 px-1"
        >
          {messageHistory.map((entry, index) => (
            <li className="last:bg-yellow-100" key={index}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
