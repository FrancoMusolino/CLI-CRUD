import { Teams } from "../services";
import { TeamEntity } from "@entities";
import { createTeamDto, updateTeamDto } from "@dtos";

export class Team {
  private readonly teamsService: Teams;

  constructor() {
    this.teamsService = new Teams();
  }

  getAll(): TeamEntity[] {
    return this.teamsService.findAll();
  }

  getOne(id: string): TeamEntity | Error {
    try {
      const team = this.teamsService.findOne(id);
      return team;
    } catch (error) {
      return error as Error;
    }
  }

  create(payload: createTeamDto): void {
    this.teamsService.create(payload);
  }
}
