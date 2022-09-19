export interface Player {
  ID: string;
  name: string;
  lastName: string;
  age: number;
  teamID: string | null;
  goals?: number;
}
