import { readFileSync } from "fs";
import { Player, Team } from "@entities";

export const readPlayersFile = (path: string): Player[] => {
  try {
    const data = readFileSync(path);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};

export const readTeamsFile = (path: string): Team[] => {
  try {
    const data = readFileSync(path);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};
