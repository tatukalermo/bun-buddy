"use client";

import { generateGameGrid } from "./utils/generateGameGrid";

export default function Home() {
  const mapWidth = 5;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className={`grid grid-cols-${mapWidth}`}>
        {generateGameGrid(mapWidth).map((cell, index) => {
          return (
            <div
              key={index}
              className="bg-green-600 odd:bg-green-400 w-12 h-12 text-sm"
            >
              <span>x:{cell.x}</span>
              <span>y:{cell.y}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
