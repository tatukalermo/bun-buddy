import React, { useEffect, useState } from "react";
import { generateGameGrid, type gridCell } from "../../utils/generateGameGrid";

interface GameMapGridProps {
  mapWidth: number;
}

const GameMapGrid: React.FC<GameMapGridProps> = ({ mapWidth }) => {
  const [map, setMap] = useState<gridCell[]>();

  useEffect(() => {
    setMap(generateGameGrid(mapWidth));
  }, [mapWidth, setMap]);

  return (
    <div
      className={`grid grid-cols-${mapWidth} w-fit shadow-teal-900 shadow-lg border-2 border-green-500`}
    >
      {!!map &&
        map.map((cell, index) => {
          return (
            <div
              key={`x${cell.x}y${cell.y} ${index}`}
              id={`x${cell.x}y${cell.y}`}
              className="bg-green-600 border-green-500 border-2 w-12 h-12 text-sm"
            ></div>
          );
        })}
    </div>
  );
};

export default GameMapGrid;
