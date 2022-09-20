import { Players, Teams } from "../services";
import { PlayerEntity, TeamEntity } from "@entities";
import { createPlayerDto, updatePlayerDto } from "@dtos";

export class Player {
  private readonly playersService: Players;
  private readonly teamsService: Teams;

  constructor() {
    this.playersService = new Players();
    this.teamsService = new Teams();
  }

  private getTeam(teamID: string): TeamEntity {
    return this.teamsService.findOne(teamID);
  }

  getAll(): PlayerEntity<string>[] {
    return this.playersService.findAll();
  }

  getOne(id: string): PlayerEntity<TeamEntity | string> | Error {
    try {
      const player = this.playersService.findOne(id);

      if (player.team) {
        const team = this.getTeam(player.team);
        return { ...player, team };
      }

      return player;
    } catch (error) {
      return error as Error;
    }
  }

  create(payload: createPlayerDto): void {
    try {
      const exist = this.getTeam(payload.team);
      if (exist) {
        this.playersService.create(payload);
      }
    } catch (error) {
      throw new Error("El club que está intentando asignar no existe");
    }
  }
}
