import useCategory from "@/hooks/useCategory";

export const TruncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const formatTime = (time) => {
  return new Date(time).toLocaleDateString("en-US");
};

export const storeId = process.env.VITE_STORE_ID;
export const units = [
  "KG", // Kilograms
  "G", // Grams
  "LBS", // Pounds
  "OZ", // Ounces
  "L", // Liters
  "ML", // Milliliters
  "GAL", // Gallons
  "FL OZ", // Fluid Ounces
  "M", // Meters
  "CM", // Centimeters
  "MM", // Millimeters
  "IN", // Inches
  "FT", // Feet
  "YD", // Yards
  "SQ M", // Square Meters
  "SQ FT", // Square Feet
  "SQ YD", // Square Yards
  "CU M", // Cubic Meters
  "CU FT", // Cubic Feet
  "CU IN", // Cubic Inches
  "LTR", // Liters (alternative to "L")
  "MG", // Milligrams
  "TON", // Tons (Metric)
  "CT", // Carats
  "PK", // Pack (used for bundled items)
  "EA", // Each (unit for individual items)
  "PAIR", // Pair (for shoes, gloves, etc.)
  "DOZ", // Dozen
  "BTL", // Bottle
  "BX", // Box
  "BAG", // Bag
  "ROLL", // Roll (for tape, fabric, etc.)
  "TUBE", // Tube (for toothpaste, creams, etc.)
  "CAN", // Can (for canned goods)
  "JAR", // Jar (for preserves, condiments, etc.)
  "SET", // Set (for items sold together as a set)
  "PINT", // Pints
  "QUART", // Quarts
  "SHEET", // Sheet (for paper, metal, etc.)
  "SPOOL", // Spool (for wire, thread, etc.)
  "STICK", // Stick (for butter, glue, etc.)
  "CASE", // Case (bulk packaging)
  "TSP", // Teaspoon (volume measurement)
  "TBSP", // Tablespoon (volume measurement)
  "GROSS", // Gross (144 items)
  "BUNDLE", // Bundle (grouped items)
  "BARREL", // Barrel (for oil, wine, etc.)
  "BOARD", // Board (for lumber, wood, etc.)
  "PLANK", // Plank (for wood, flooring, etc.)
  "UNIT",
];

export const quantityType = [
  "piece", // For items sold by pieces (e.g., PIECE, SHEET)
  "units", // For generic unit-based items (e.g., UNIT)
  "package", // For bundled items (e.g., PK, BX, BAG)
  "bottle", // For liquid items sold in bottles (e.g., BTL)
  "weight", // For items measured in weight (e.g., KG, LBS)
  "volume", // For items measured in volume (e.g., L, ML, GAL)
  "length", // For items measured in length (e.g., M, CM, IN)
  "area", // For items measured in area (e.g., SQ M, SQ FT)
  "count", // For items measured by count (e.g., EA, DOZ)
  "set", // For items sold as a set (e.g., SET, PAIR)
  "capacity", // For items measured by capacity (e.g., BTU, HP)
  "roll", // For items sold in rolls (e.g., ROLL)
  "tube", // For items sold in tubes (e.g., TUBE)
  "can", // For items sold in cans (e.g., CAN)
  "jar", // For items sold in jars (e.g., JAR)
  "case", // For bulk items sold in cases (e.g., CASE)
  "box", // For items sold in boxes (e.g., BOX)
  "barrel", // For items sold in barrels (e.g., BARREL)
  "stick", // For items sold in sticks (e.g., STICK)
  "spool", // For items sold in spools (e.g., SPOOL)
  "bundle", // For items sold in bundles (e.g., BUNDLE)
  "board", // For items sold as boards (e.g., BOARD, PLANK)
  "gross", // For bulk items measured by gross (e.g., GROSS)
  "pair", // For items sold in pairs (e.g., PAIR)
];

export const getUnitsByType = (selectedType) => {
  let updatedUnits = [];
  switch (selectedType) {
    case "piece":
      updatedUnits = units.filter((unit) => ["PIECE", "SHEET"].includes(unit));
      break;
    case "units":
      updatedUnits = units.filter((unit) => ["UNIT"].includes(unit));
      break;
    case "package":
      updatedUnits = units.filter((unit) => ["PK", "BX", "BAG"].includes(unit));
      break;
    case "bottle":
      updatedUnits = units.filter((unit) => ["BTL"].includes(unit));
      break;
    case "weight":
      updatedUnits = units.filter((unit) =>
        ["KG", "G", "LBS", "OZ", "MG", "TON"].includes(unit)
      );
      break;
    case "volume":
      updatedUnits = units.filter((unit) =>
        ["L", "ML", "GAL", "FL OZ", "PINT", "QUART", "LTR"].includes(unit)
      );
      break;
    case "length":
      updatedUnits = units.filter((unit) =>
        ["M", "CM", "MM", "IN", "FT", "YD"].includes(unit)
      );
      break;
    case "area":
      updatedUnits = units.filter((unit) =>
        ["SQ M", "SQ FT", "SQ YD"].includes(unit)
      );
      break;
    case "count":
      updatedUnits = units.filter((unit) =>
        ["EA", "DOZ", "GROSS"].includes(unit)
      );
      break;
    case "set":
      updatedUnits = units.filter((unit) => ["SET", "PAIR"].includes(unit));
      break;
    case "capacity":
      updatedUnits = units.filter((unit) => ["BTU", "HP"].includes(unit));
      break;
    case "roll":
      updatedUnits = units.filter((unit) => ["ROLL"].includes(unit));
      break;
    case "tube":
      updatedUnits = units.filter((unit) => ["TUBE"].includes(unit));
      break;
    case "can":
      updatedUnits = units.filter((unit) => ["CAN"].includes(unit));
      break;
    case "jar":
      updatedUnits = units.filter((unit) => ["JAR"].includes(unit));
      break;
    case "case":
      updatedUnits = units.filter((unit) => ["CASE"].includes(unit));
      break;
    case "box":
      updatedUnits = units.filter((unit) => ["BOX"].includes(unit));
      break;
    case "barrel":
      updatedUnits = units.filter((unit) => ["BARREL"].includes(unit));
      break;
    case "stick":
      updatedUnits = units.filter((unit) => ["STICK"].includes(unit));
      break;
    case "spool":
      updatedUnits = units.filter((unit) => ["SPOOL"].includes(unit));
      break;
    case "bundle":
      updatedUnits = units.filter((unit) => ["BUNDLE"].includes(unit));
      break;
    case "board":
      updatedUnits = units.filter((unit) => ["BOARD", "PLANK"].includes(unit));
      break;
    case "gross":
      updatedUnits = units.filter((unit) => ["GROSS"].includes(unit));
      break;
    case "pair":
      updatedUnits = units.filter((unit) => ["PAIR"].includes(unit));
      break;
    default:
      updatedUnits = [];
  }
  return updatedUnits;
};
