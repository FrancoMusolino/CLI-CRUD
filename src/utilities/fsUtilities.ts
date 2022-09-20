import { readFileSync } from "fs";
import { writeFile } from "fs/promises";

import { PlayerEntity, TeamEntity } from "@entities";

export const readPlayersFile = (
  path: string
): PlayerEntity<string | null>[] => {
  try {
    const data = readFileSync(path);
    return JSON.parse(data.toString());
  } catch (error) {
    writePlayersFile(path, []);
    return [];
  }
};

export const writePlayersFile = async (
  path: string,
  payload: PlayerEntity<string | null>[]
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
    writeTeamsFile(path, []);
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
