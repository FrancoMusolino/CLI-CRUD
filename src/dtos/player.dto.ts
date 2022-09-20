import { PlayerEntity } from "@entities";

export type createPlayerDto = Omit<PlayerEntity<string>, "ID">;

export type updatePlayerDto = Partial<createPlayerDto>;
