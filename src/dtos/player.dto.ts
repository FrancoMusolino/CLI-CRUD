import { PlayerEntity } from "@entities";

export type createPlayerDto = Omit<PlayerEntity, "ID">;

export type updatePlayerDto = Partial<createPlayerDto>;
