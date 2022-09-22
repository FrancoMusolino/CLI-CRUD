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

  private getTeam(teamID: string): TeamEntity | Error {
    return this.teamsService.findOne(teamID);
  }

  getAll(): PlayerEntity<string>[] {
    return this.playersService.findAll();
  }

  getOne(id: string): PlayerEntity<TeamEntity> | Error {
    try {
      const player = this.playersService.findOne(id);

      if (player.team) {
        const team = this.getTeam(player.team);

        if (team instanceof Error) throw team.message;
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
      throw error as Error;
    }
  }

  async update(
    id: string,
    payload: updatePlayerDto
  ): Promise<typeof payload | Error> {
    try {
      payload.team && this.getTeam(payload.team);

      return await this.playersService.update(id, payload);
    } catch (error) {
      return error as Error;
    }
  }

  async delete(id: string): Promise<void> {
    await this.playersService.delete(id);
  }
}
