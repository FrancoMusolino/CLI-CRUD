import { TeamEntity } from "./team.entity";

export interface PlayerEntity<T extends string | TeamEntity> {
  ID: string;
  name: string;
  age: number;
  team: T | null;
  goals?: number;
}
