"use client";

import { useEffect, useState } from "react";
import { generateGameGrid, type gridCell } from "./utils/generateGameGrid";

export default function Home() {
  const [mapWidth] = useState(4);
  const [map, setMap] = useState<gridCell[]>();

  useEffect(() => {
    setMap(generateGameGrid(mapWidth));
  }, [mapWidth, setMap]);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div
        className={`grid grid-cols-${mapWidth} w-fit shadow-teal-900 shadow-lg border-2 border-green-500`}
      >
        {!!map &&
          map.map((cell) => {
            return (
              <div
                key={`x${cell.x}y${cell.x}`}
                id={`x${cell.x}y${cell.x}`}
                className="bg-green-600 border-green-500 border-2 w-12 h-12 text-sm"
              ></div>
            );
          })}
      </div>
    </main>
  );
}
