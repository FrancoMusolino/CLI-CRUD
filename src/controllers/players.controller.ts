import { Player } from "@models";

export class Players {
  private players: Player[];

  constructor() {
    this.players = [];
  }

  getPlayers() {
    return this.players;
  }
}
