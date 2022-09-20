import { Team } from "entities";

export class Players {
  private readonly teams: Team[];

  constructor() {
    this.teams = [];
  }

  findAll() {
    return this.teams;
  }

  findOne(id: string) {}

  update(id: string) {}

  delete(id: string) {}
}
