import { readFileSync } from "fs";
import { writeFile } from "fs/promises";

import { Player, Team } from "@entities";

export const readPlayersFile = (path: string): Player[] => {
  try {
    const data = readFileSync(path);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};

export const writePlayersFile = async (path: string, payload: Player[]) => {
  try {
    await writeFile(path, JSON.stringify(payload));
  } catch (error) {
    throw new Error("Upss, algo salió mal");
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

export const writeTeamsFile = async (path: string, payload: Team[]) => {
  try {
    await writeFile(path, JSON.stringify(payload));
  } catch (error) {
    throw new Error("Upss, algo salió mal");
  }
};
