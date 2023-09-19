import { create } from "zustand";
import { unitImage } from "@/utils/unitImages";
import { Player, Unit } from "@/types";

interface GameState {
  playerUnits: Unit[];
  placeNewUnit: (unit: Unit) => void;
  updateGameState: (units: Unit[]) => void;
}

export const useGameState = create<GameState>((set) => ({
  playerUnits: [],
  placeNewUnit: ({ unitType, location, owner }) => {
    set(({ playerUnits }) => {
      console.log("adding new unit!", playerUnits);
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
  updateGameState: (units) => {
    set(() => {
      return {
        playerUnits: units.map((unit) => {
          return {
            owner: unit.owner,
            unitType: unit.unitType,
            image: unitImage(unit.unitType),
            location: unit.location,
          };
        }),
      };
    });
  },
}));
