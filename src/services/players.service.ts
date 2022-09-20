import { v4 as uuidv4 } from "uuid";

import { Player } from "@entities";
import { createPlayerDto, updatePlayerDto } from "@dtos";
import { readPlayersFile, writePlayersFile } from "../utilities";

export class Players {
  static fileName = "database/players.json";
  private players: Player[];

  constructor() {
    this.players = readPlayersFile(Players.fileName);
  }

  findAll() {
    return this.players;
  }

  findOne(id: string) {
    const player = this.players.find((player) => player.ID === id);

    if (!player) {
      throw new Error("Jugador no encontrado");
    }

    return player;
  }

  async create(payload: createPlayerDto) {
    const newPlayer = { ID: uuidv4(), ...payload };
    this.players.push(newPlayer);

    try {
      await writePlayersFile(Players.fileName, this.players);
      return newPlayer;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  async update(id: string, payload: updatePlayerDto) {
    const updatedPlayers = this.players.map((player) =>
      player.ID !== id ? player : { ...player, ...payload }
    );

    this.players = updatedPlayers;

    try {
      await writePlayersFile(Players.fileName, this.players);
      return payload;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  async delete(id: string) {
    const newPlayers = this.players.filter((player) => player.ID !== id);

    this.players = newPlayers;

    try {
      await writePlayersFile(Players.fileName, this.players);
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }
}
