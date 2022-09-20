import { Command } from "commander";
import prompt from "prompts";
import chalk from "chalk";

import { Player } from "./controllers";
import { CRUD } from "./enums";

const player = new Player();

const program = new Command();

program.name("CLI APP").description("A simple CLI CRUD APP").version("1.0.0");

program
  .command("players")
  .description("Administra los jugadores tu equipo de fútbol")
  .action(async () => {
    const { action } = await prompt({
      name: "action",
      type: "select",
      message: "Elige la opción a realizar con los jugadores",
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
        const { team } = await prompt({
          name: "team",
          type: "text",
          message: "Ingrese el ID del equipo actual del jugador",
        });
        const { goals } = await prompt({
          name: "goals",
          type: "number",
          message: "Ingrese los goles hechos en su carrera",
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

        // console.log(
        //   chalk.green(`El jugador encontrado es: ${singlePlayer.name}`)
        // );
        console.table(singlePlayer);
    }
  });

program.parse();
