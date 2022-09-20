import { Team } from "@entities";

export type createTeamDto = Omit<Team, "ID">;

export type updateTeamDto = Partial<createTeamDto>;
