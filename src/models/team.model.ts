import { Team } from "entities";
import { readTeamsFile } from "../utilities";

export class Teams {
  static fileName = "database/teams.json";
  private readonly teams: Team[];

  constructor() {
    this.teams = readTeamsFile(Teams.fileName);
  }

  findAll() {
    return this.teams;
  }

  findOne(id: string) {}

  update(id: string) {}

  delete(id: string) {}
}
