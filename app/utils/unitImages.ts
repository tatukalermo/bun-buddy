import BasicUnitImage from "../../public/basic-unit.svg";
import type { UnitVariation } from "../store/useGameState";

export const unitImage = (unitType: UnitVariation) => {
  switch (unitType) {
    case "basic":
      return BasicUnitImage;
  }
};
