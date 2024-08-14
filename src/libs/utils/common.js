export const TruncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const formatTime = (time) => {
  return new Date(time).toLocaleDateString("en-US");
};

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
];

export const quantityType = [
  "Pieces", // For items sold by pieces (e.g., PIECE, SHEET)
  "Units", // For generic unit-based items (e.g., UNIT)
  "Package", // For bundled items (e.g., PK, BX, BAG)
  "Bottle", // For liquid items sold in bottles (e.g., BTL)
  "Weight", // For items measured in weight (e.g., KG, LBS)
  "Volume", // For items measured in volume (e.g., L, ML, GAL)
  "Length", // For items measured in length (e.g., M, CM, IN)
  "Area", // For items measured in area (e.g., SQ M, SQ FT)
  "Count", // For items measured by count (e.g., EA, DOZ)
  "Set", // For items sold as a set (e.g., SET, PAIR)
  "Capacity", // For items measured by capacity (e.g., BTU, HP)
  "Roll", // For items sold in rolls (e.g., ROLL)
  "Tube", // For items sold in tubes (e.g., TUBE)
  "Can", // For items sold in cans (e.g., CAN)
  "Jar", // For items sold in jars (e.g., JAR)
  "Case", // For bulk items sold in cases (e.g., CASE)
  "Box", // For items sold in boxes (e.g., BOX)
  "Barrel", // For items sold in barrels (e.g., BARREL)
  "Stick", // For items sold in sticks (e.g., STICK)
  "Spool", // For items sold in spools (e.g., SPOOL)
  "Bundle", // For items sold in bundles (e.g., BUNDLE)
  "Board", // For items sold as boards (e.g., BOARD, PLANK)
  "Gross", // For bulk items measured by gross (e.g., GROSS)
  "Pair", // For items sold in pairs (e.g., PAIR)
];
