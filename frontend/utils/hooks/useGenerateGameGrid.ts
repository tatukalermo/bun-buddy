import { Location } from "@/types";

export type gridCell = {
  location: Location;
  groundType: "default" | "blocked";
};

export const useGenerateGameGrid: (size: number) => gridCell[] = (size = 3) => {
  const grid: gridCell[] = [];

  for (let i = 0; i < size * size; i++) {
    const col = (i % size) + 1;
    const row = Math.floor(i / size) + 1;

    grid.push({
      location: { x: col, y: row },
      groundType: "default",
    });
  }

  return grid;
};
