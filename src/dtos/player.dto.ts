import { PlayerEntity } from "@entities";

export type createPlayerDto = Omit<PlayerEntity<string | null>, "ID">;

export type updatePlayerDto = Partial<createPlayerDto>;
