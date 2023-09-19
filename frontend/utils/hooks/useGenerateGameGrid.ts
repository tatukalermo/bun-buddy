import { useGameState } from "@/store/useGameState";
import { Location, Unit } from "@/types";

export type gridCell = {
  location: Location;
  groundType: "default" | "blocked";
  unit: Unit | undefined;
};

export const useGenerateGameGrid: (size: number) => gridCell[] = (size = 3) => {
  const grid: gridCell[] = [];
  const { playerUnits } = useGameState();

  for (let i = 0; i < size * size; i++) {
    let unit = undefined;
    const col = (i % size) + 1;
    const row = Math.floor(i / size) + 1;

    if (playerUnits.length)
      unit = playerUnits.find(
        (unit) => unit.location.x === col && unit.location.y === row
      );

    grid.push({
      location: { x: col, y: row },
      groundType: "default",
      unit,
    });
  }

  return grid;
};
