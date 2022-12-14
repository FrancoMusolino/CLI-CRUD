import { PromptObject } from "prompts";
import { isNumber } from "util";
import { countries } from "./countries";

export const playerQuestions: PromptObject[] = [
  {
    name: "name",
    type: "text",
    message: "Ingrese el nombre del jugador",
    validate: (val) => !!val && isNaN(val),
  },
  {
    name: "age",
    type: "number",
    message: "Ingrese la edad del jugador (entre 14 y 100)",
    validate: (val) => !!val && +val >= 14 && +val <= 100,
  },
  {
    name: "goals",
    type: "number",
    message: "Ingrese los goles hechos en su carrera",
    validate: (val) => val !== "" && !isNaN(val) && +val >= 0,
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
    mask: "DD-MM-YYYY",
    format: (val) => new Intl.DateTimeFormat("es").format(val),
  },
  {
    name: "titles",
    type: "number",
    message: "Ingrese la cantidad de títulos del equipo",
    validate: (val) => val !== "" && !isNaN(val) && +val >= 0,
  },
];
