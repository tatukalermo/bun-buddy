import { create } from "zustand";
import BasicUnitImage from "../../public/basic-unit.svg";
import { unitImage } from "../utils/unitImages";

export type UnitVariation = "basic" | "knight";

export type Unit = {
  owner: "player1" | "player2";
  unitType: UnitVariation;
  location: {
    x: number;
    y: number;
  };
  image?: any;
};

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
