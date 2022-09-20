import { Player } from "@entities";
import { readPlayersFile } from "../utilities";

export class Players {
  static fileName = "database/players.json";
  private readonly players: Player[];

  constructor() {
    this.players = readPlayersFile(Players.fileName);
  }

  findAll() {
    return this.players;
  }

  findOne(id: string) {}

  update(id: string) {}

  delete(id: string) {}
}
