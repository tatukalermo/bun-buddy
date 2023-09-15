import React, { useEffect, useState } from "react";
import { generateGameGrid, type gridCell } from "../../utils/generateGameGrid";
import { useGameState } from "../../store/useGameState";
import Image from "next/image";

interface GameMapGridProps {
  mapWidth: number;
}

const GameMapGrid: React.FC<GameMapGridProps> = ({ mapWidth }) => {
  const { placeNewUnit, playerUnits } = useGameState();
  const [map, setMap] = useState<gridCell[]>();

  useEffect(() => {
    setMap(generateGameGrid(mapWidth));
  }, [mapWidth, setMap]);

  return (
    <div
      className={`grid grid-cols-${mapWidth} w-full max-w-2xl shadow-teal-900 shadow-lg border-4 border-green-500`}
    >
      {!!map &&
        map.map((cell, cellIndex) => {
          const unit = playerUnits.find(
            (unit) => unit.location.x === cell.x && unit.location.y === cell.y
          );

          return (
            <div
              key={`${cell.x}${cell.y}${cellIndex}`}
              id={`x${cell.x}y${cell.y}`}
              className={`bg-green-600 border-green-500 border-4 w-[${
                100 / mapWidth
              }%] aspect-square`}
              onClick={() => {
                if (!!unit) return; // escape event if unit exists
                placeNewUnit({
                  owner: "player1",
                  unitType: "basic",
                  location: { x: cell.x, y: cell.y },
                });
              }}
            >
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
