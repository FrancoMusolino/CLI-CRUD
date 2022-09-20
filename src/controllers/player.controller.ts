import { Players, Teams } from "../services";

import { createPlayerDto, updatePlayerDto } from "@dtos";

export class Player {
  private readonly playersService: Players;
  private readonly teamsService: Teams;

  constructor() {
    this.playersService = new Players();
    this.teamsService = new Teams();
  }

  private getTeam(teamID: string) {
    this.teamsService.findOne(teamID);
  }

  getAll() {
    return this.playersService.findAll();
  }

  getOne(id: string) {
    try {
      const player = this.playersService.findOne(id);

      if (player.team) {
        const team = this.getTeam(player.team);
        return { ...player, team };
      }

      return player;
    } catch (error) {
      return error;
    }
  }

  create(payload: createPlayerDto) {
    this.playersService.create(payload);
  }
}
