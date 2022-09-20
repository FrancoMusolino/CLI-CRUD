import { v4 as uuidv4 } from "uuid";

import { Team } from "@entities";
import { createTeamDto, updateTeamDto } from "@dtos";
import { readTeamsFile, writeTeamsFile } from "../utilities";

export class Teams {
  static fileName = "database/teams.json";
  private teams: Team[];

  constructor() {
    this.teams = readTeamsFile(Teams.fileName);
  }

  findAll() {
    return this.teams;
  }

  findOne(id: string) {
    const team = this.teams.find((team) => team.ID === id);

    if (!team) {
      throw new Error("Equipo no encontrado");
    }

    return team;
  }

  async create(payload: createTeamDto) {
    const newTeam = { ID: uuidv4(), ...payload };
    this.teams.push(newTeam);

    try {
      await writeTeamsFile(Teams.fileName, this.teams);
      return newTeam;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  async update(id: string, payload: updateTeamDto) {
    const updatedTeams = this.teams.map((team) =>
      team.ID !== id ? team : { ...team, ...payload }
    );

    this.teams = updatedTeams;

    try {
      await writeTeamsFile(Teams.fileName, this.teams);
      return payload;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  async delete(id: string) {
    const newTeams = this.teams.filter((team) => team.ID !== id);

    this.teams = newTeams;

    try {
      await writeTeamsFile(Teams.fileName, this.teams);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }
}
