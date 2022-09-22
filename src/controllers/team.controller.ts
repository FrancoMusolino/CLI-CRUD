import { Players, Teams } from "../services";
import { TeamEntity, PlayerEntity } from "@entities";
import { createTeamDto, updateTeamDto } from "@dtos";

export class Team {
  private readonly playersService: Players;
  private readonly teamsService: Teams;

  constructor() {
    this.teamsService = new Teams();
    this.playersService = new Players();
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

  async delete(id: string): Promise<void> {
    try {
      await this.playersService.deletePlayersTeam(id);
      await this.teamsService.delete(id);
    } catch (error) {
      throw error as Error;
    }
  }
}
