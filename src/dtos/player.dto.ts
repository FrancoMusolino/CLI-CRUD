import { Player } from "@entities";

export type createPlayerDto = Omit<Player, "ID">;

export type updatePlayerDto = Partial<createPlayerDto>;
