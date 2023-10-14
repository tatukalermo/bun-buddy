import { UnitVariation } from "@/types";
import BasicUnitImage from "@/public/basic-unit.svg";

export const unitImage = (unitType: UnitVariation) => {
  switch (unitType) {
    case "basic":
      return BasicUnitImage;
  }
};
