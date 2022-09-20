import { TeamEntity } from "@entities";

export type createTeamDto = Omit<TeamEntity, "ID">;

export type updateTeamDto = Partial<createTeamDto>;
