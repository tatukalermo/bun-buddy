"use client";

import GameMapGrid from "@/components/game/GameMapGrid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <GameMapGrid mapWidth={5} />
    </main>
  );
}
