import { Command } from "commander";
import prompt from "prompts";
import chalk from "chalk";

import { Player, Team } from "./controllers";
import { CRUD } from "./enums";

const player = new Player();
const team = new Team();

const program = new Command();

program.name("CLI APP").description("A simple CLI CRUD APP").version("1.0.0");

program
  .command("players")
  .description("Administra los jugadores tu equipo de fútbol")
  .action(async () => {
    const { action } = await prompt({
      name: "action",
      type: "select",
      message: "Elige la operación a realizar con los jugadores",
      choices: [
        {
          title: "Agregar",
          value: CRUD.CREATE,
        },
        {
          title: "Ver todos",
          value: CRUD.READ,
        },
        {
          title: "Ver Uno",
          value: CRUD.READ_ONE,
        },
        {
          title: "Actualizar un jugador",
          value: CRUD.UPDATE,
        },
        {
          title: "Eliminar un jugador",
          value: CRUD.DELETE,
        },
      ],
    });

    switch (action) {
      case CRUD.CREATE:
        const { name } = await prompt({
          name: "name",
          type: "text",
          message: "Ingrese el nombre del jugador",
        });
        const { age } = await prompt({
          name: "age",
          type: "number",
          message: "Ingrese la edad del jugador",
        });
        const { goals } = await prompt({
          name: "goals",
          type: "number",
          message: "Ingrese los goles hechos en su carrera",
        });
        const { team } = await prompt({
          name: "team",
          type: "text",
          message: "Ingrese el ID del equipo actual del jugador",
        });

        try {
          player.create({ name, age, team: team || null, goals });
          return console.log(chalk.green("Jugador creado exitosamente"));
        } catch (error) {
          return console.log(chalk.red(error));
        }

      case CRUD.READ:
        const players = player.getAll();

        return console.table(players);

      case CRUD.READ_ONE:
        const { id } = await prompt({
          name: "id",
          type: "text",
          message: "Ingrese el ID del jugador a buscar",
        });

        const singlePlayer = player.getOne(id);

        if (singlePlayer instanceof Error) {
          return console.log(chalk.red(singlePlayer.message));
        }

        console.log(
          chalk.green(`El jugador encontrado es: ${singlePlayer.name}`)
        );
        console.log(singlePlayer);
    }
  });

program
  .command("teams")
  .description("Administra los equipos de fútbol")
  .action(async () => {
    const { action } = await prompt({
      name: "action",
      type: "select",
      message: "Elige la operación a realizar con los equipos",
      choices: [
        {
          title: "Agregar",
          value: CRUD.CREATE,
        },
        {
          title: "Ver todos",
          value: CRUD.READ,
        },
        {
          title: "Ver Uno",
          value: CRUD.READ_ONE,
        },
        {
          title: "Actualizar un equipo",
          value: CRUD.UPDATE,
        },
        {
          title: "Eliminar un equipo",
          value: CRUD.DELETE,
        },
      ],
    });

    switch (action) {
      case CRUD.CREATE:
        const { name } = await prompt({
          name: "name",
          type: "text",
          message: "Ingrese el nombre del equipo",
        });
        const { country } = await prompt({
          name: "country",
          type: "text",
          message: "Ingrese el país del equipo",
        });
        const { foundation } = await prompt({
          name: "foundation",
          type: "date",
          message: "Ingrese la fecha de fundación",
        });
        const { titles } = await prompt({
          name: "titles",
          type: "number",
          message: "Ingrese la cantidad de títulos del equipo",
        });

        try {
          team.create({ name, country, foundation, titles });
          return console.log(chalk.green("Equipo creado exitosamente"));
        } catch (error) {
          return console.log(chalk.red(error));
        }

      case CRUD.READ:
        const teams = team.getAll();

        return console.table(teams);

      case CRUD.READ_ONE:
        const { id } = await prompt({
          name: "id",
          type: "text",
          message: "Ingrese el ID del equipo a buscar",
        });

        const singleTeam = team.getOne(id);

        if (singleTeam instanceof Error) {
          return console.log(chalk.red(singleTeam.message));
        }

        console.log(chalk.green(`El equipo encontrado es: ${singleTeam.name}`));
        console.log(singleTeam);
    }
  });

program.parse();
