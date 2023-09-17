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
