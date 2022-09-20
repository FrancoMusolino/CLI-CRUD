import { Player } from "entities";

export class Players {
  private readonly players: Player[];

  constructor() {
    this.players = [];
  }

  findAll() {
    return this.players;
  }

  findOne(id: string) {}

  update(id: string) {}

  delete(id: string) {}
}
