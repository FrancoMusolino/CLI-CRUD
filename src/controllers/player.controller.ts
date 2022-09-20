import { Players } from "../services";
import { createPlayerDto, updatePlayerDto } from "@dtos";

export class Player {
  private readonly playersModel: Players;

  constructor() {
    this.playersModel = new Players();
  }

  getAll() {
    return this.playersModel.findAll();
  }

  getOne(id: string) {
    return this.playersModel.findOne(id);
  }

  create(payload: createPlayerDto) {
    this.playersModel.create(payload);
  }
}
