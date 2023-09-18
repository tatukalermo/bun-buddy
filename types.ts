export type UnitVariation = "basic";

export type Location = { x: number; y: number };

export type PlayerSide = "player1" | "player2";

export type Player = { username: string; side: PlayerSide };

export type Unit = {
  owner: PlayerSide;
  unitType: UnitVariation;
  location: Location;
  image?: any;
};
