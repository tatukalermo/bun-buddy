import { create } from "zustand";
import { unitImage } from "@/utils/unitImages";
import { Player, Unit } from "@/types";

interface GameState {
  playerUnits: Unit[];
  placeNewUnit: (unit: Unit) => void;
}

export const useGameState = create<GameState>((set) => ({
  playerUnits: [],
  placeNewUnit: ({ unitType, location, owner }) => {
    set(({ playerUnits }) => {
      return {
        playerUnits: [
          ...playerUnits,
          {
            owner: owner,
            unitType: unitType,
            image: unitImage(unitType),
            location: location,
          },
        ],
      };
    });
  },
}));
