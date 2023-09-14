import { create } from "zustand";

type Unit = {
  player: "player1" | "player2";
  unitType: "basic";
  location: {
    x: number;
    y: number;
  };
};

interface GameState {
  playerUnits: Unit[];
  placeUnit: (
    location: { x: number; y: number },
    player: "player1" | "player2"
  ) => void;
}

export const useGameState = create<GameState>((set) => ({
  playerUnits: [],
  placeUnit: (location, player) =>
    set(({ playerUnits }) => {
      return {
        playerUnits: [
          ...playerUnits,
          { player: player, unitType: "basic", location },
        ],
      };
    }),
}));
