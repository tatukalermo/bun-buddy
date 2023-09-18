import React from "react";
import { useGenerateGameGrid } from "@/utils/hooks/useGenerateGameGrid";
import Image from "next/image";
import { addUnit } from "@/utils/webSocketClient";
import { useGameState } from "@/store/useGameState";

interface GameMapGridProps {
  mapWidth: number;
}

const GameMapGrid: React.FC<GameMapGridProps> = ({ mapWidth }) => {
  const { player } = useGameState();
  const map = useGenerateGameGrid(mapWidth);
  return (
    <div
      className={`grid grid-cols-${mapWidth} shadow-teal-900 shadow-lg border-4 border-green-500`}
    >
      {!!map &&
        map.map((cell, cellIndex) => {
          return (
            <div
              key={`${cell.location.x}${cell.location.y}${cellIndex}`}
              className={`bg-green-600 border-green-500 border-4 w-[${
                100 / mapWidth
              }%] aspect-square`}
              onClick={() => {
                if (!!cell.unit) return; // escape event if unit exists
                addUnit({
                  owner: player.side,
                  unitType: "basic",
                  location: cell.location,
                });
              }}
            >
              <span className="absolute scale-75 origin-top-left mx-1">
                <span className="text-gray-800">x{cell.location.x}</span>{" "}
                <span className="text-gray-300">y{cell.location.y}</span>
              </span>
              {!!cell.unit && (
                <Image
                  className={`w-full ${
                    cell.unit.owner === "player2" ? "invert" : ""
                  }`}
                  src={cell.unit.image}
                  alt={`${cell.unit.unitType}-unit-${cell.unit.owner}`}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default GameMapGrid;
