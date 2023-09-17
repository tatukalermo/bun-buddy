"use client";

import GameMapGrid from "@/components/game/GameMapGrid";
import { useEffect } from "react";
import {
  listenWebSocketMessageEvents,
  removeWebSocketMessageEvents,
} from "@/utils/webSocketClient";

export default function Home() {
  useEffect(() => {
    listenWebSocketMessageEvents();
    return () => {
      removeWebSocketMessageEvents();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <GameMapGrid mapWidth={5} />
    </main>
  );
}
