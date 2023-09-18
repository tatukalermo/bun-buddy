import { create } from "zustand";
import { unitImage } from "@/utils/unitImages";
import { Unit } from "@/types";

interface GameState {
  playerUnits: Unit[];
  placeNewUnit: (unit: Unit) => void;
}

export const useGameState = create<GameState>((set) => ({
  playerUnits: [],
  placeNewUnit: (unit: Unit) =>
    set(({ playerUnits }) => {
      return {
        playerUnits: [
          ...playerUnits,
          {
            owner: unit.owner,
            unitType: unit.unitType,
            image: unitImage(unit.unitType),
            location: unit.location,
          },
        ],
      };
    }),
}));
