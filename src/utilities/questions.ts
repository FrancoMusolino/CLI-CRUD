import { PromptObject } from "prompts";
import { countries } from "./countries";

export const playerQuestions: PromptObject[] = [
  {
    name: "name",
    type: "text",
    message: "Ingrese el nombre del jugador",
    validate: (val) => !!val,
  },
  {
    name: "age",
    type: "number",
    message: "Ingrese la edad del jugador (entre 14 y 100)",
    validate: (val) => !!val && val >= 14 && val <= 100,
  },
  {
    name: "goals",
    type: "number",
    message: "Ingrese los goles hechos en su carrera",
  },
  {
    name: "team",
    type: "text",
    message: "Ingrese el ID del equipo actual del jugador",
  },
];

export const teamQuestions: PromptObject[] = [
  {
    name: "name",
    type: "text",
    message: "Ingrese el nombre del equipo",
    validate: (val) => !!val,
  },
  {
    name: "country",
    type: "autocomplete",
    message: "Ingrese el país del equipo",
    choices: [...countries],
  },
  {
    name: "foundation",
    type: "date",
    message: "Ingrese la fecha de fundación",
    format: (val) => new Intl.DateTimeFormat("es").format(val),
  },
  {
    name: "titles",
    type: "number",
    message: "Ingrese la cantidad de títulos del equipo",
    min: 0,
    validate: (val) => !!val,
  },
];
