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

  getAll(): PlayerEntity<string | null>[] {
    return this.playersService.findAll();
  }

  getOne(id: string): PlayerEntity<TeamEntity | null> | Error {
    try {
      const player = this.playersService.findOne(id);

      if (player.team) {
        const team = this.getTeam(player.team);
        return { ...player, team };
      }

      return { ...player, team: null };
    } catch (error) {
      return error as Error;
    }
  }

  create(payload: createPlayerDto): void {
    try {
      const exist = payload.team && this.getTeam(payload.team);
      if (exist || !payload.team) {
        this.playersService.create(payload);
      }
    } catch (error) {
      throw new Error("El club que está intentando asignar no existe");
    }
  }
}
