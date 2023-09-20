import React from "react";
import { useGenerateGameGrid } from "@/utils/hooks/useGenerateGameGrid";
import Image from "next/image";
import { useGameState } from "@/store/useGameState";
import { Unit } from "@/types";

interface GameMapGridProps {
  mapWidth: number;
  addUnit: (unit: Unit) => void;
}

const GameMapGrid: React.FC<GameMapGridProps> = ({ mapWidth, addUnit }) => {
  const map = useGenerateGameGrid(mapWidth);
  const { playerUnits } = useGameState();
  return (
    <div
      className={`grid grid-cols-${mapWidth} shadow-teal-900 shadow-lg border-4 border-green-500`}
    >
      {!!map &&
        map.map((cell, cellIndex) => {
          const unit = playerUnits.find(
            (unit) =>
              unit.location.x === cell.location.x &&
              unit.location.y === cell.location.y
          );
          return (
            <div
              key={`${cell.location.x}${cell.location.y}${cellIndex}`}
              className={`bg-green-600 border-green-500 border-4 w-[${
                100 / mapWidth
              }%] aspect-square`}
              onClick={() => {
                if (!!unit) return; // escape event if unit exists
                addUnit({
                  owner: "player1",
                  unitType: "basic",
                  location: cell.location,
                });
              }}
            >
              <span className="absolute scale-75 origin-top-left mx-1">
                <span className="text-gray-800">x{cell.location.x}</span>{" "}
                <span className="text-gray-300">y{cell.location.y}</span>
              </span>
              {!!unit && (
                <Image
                  className="w-full"
                  src={unit.image}
                  alt={`${unit.unitType}-unit-${unit.owner}`}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default GameMapGrid;
