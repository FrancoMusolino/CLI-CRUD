import { readFileSync } from "fs";
import { writeFile } from "fs/promises";

import { PlayerEntity, TeamEntity } from "@entities";

export const readPlayersFile = (path: string): PlayerEntity[] => {
  try {
    const data = readFileSync(path);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};

export const writePlayersFile = async (
  path: string,
  payload: PlayerEntity[]
) => {
  try {
    await writeFile(path, JSON.stringify(payload));
  } catch (error) {
    throw new Error("Upss, algo salió mal");
  }
};

export const readTeamsFile = (path: string): TeamEntity[] => {
  try {
    const data = readFileSync(path);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
};

export const writeTeamsFile = async (path: string, payload: TeamEntity[]) => {
  try {
    await writeFile(path, JSON.stringify(payload));
  } catch (error) {
    throw new Error("Upss, algo salió mal");
  }
};
