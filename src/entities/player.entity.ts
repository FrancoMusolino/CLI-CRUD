import { TeamEntity } from "./team.entity";

export interface PlayerEntity<T extends string | null | TeamEntity> {
  ID: string;
  name: string;
  age: number;
  team: T;
  goals?: number;
}
