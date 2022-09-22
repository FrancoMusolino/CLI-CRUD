import { Command } from "commander";
import prompt, { PromptObject } from "prompts";
import chalk from "chalk";

import { Player, Team } from "./controllers";
import { CRUD } from "./enums";
import { playerQuestions, teamQuestions } from "./utilities";
import { updatePlayerDto } from "@dtos";
import { PlayerEntity } from "@entities";

const player = new Player();
const team = new Team();

const program = new Command();

program.name("CLI APP").description("A simple CLI CRUD APP").version("1.0.0");

/***  PLAYERS COMMAND  ***/

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
      case CRUD.CREATE: {
        const { name, age, team, goals } = await prompt(playerQuestions, {
          onCancel,
        });

        try {
          player.create({ name, age, team: team || null, goals });
          return console.log(chalk.green("Jugador creado exitosamente"));
        } catch (error) {
          return console.log(chalk.red(error));
        }
      }

      case CRUD.READ: {
        const players = player.getAll();

        return console.table(players);
      }

      case CRUD.READ_ONE: {
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
        return console.log(singlePlayer);
      }

      case CRUD.UPDATE: {
        const { id } = await prompt({
          name: "id",
          type: "text",
          message: "Ingrese el ID del jugador a modificar",
        });

        const exist = player.getOne(id);

        if (exist instanceof Error) {
          return console.log(chalk.red(exist.message));
        }

        const updatePlayerQuestion = playerQuestions.map((question) => ({
          ...question,
          message: `¿Desea modificar el ${question.name} o dejarlo con su valor actual?`,
          initial: () => {
            const key = question.name;
            const value = Object.entries(exist).find(([k, _v]) => k === key);

            if (value) {
              return value[0] === "team"
                ? value[1]
                  ? value[1].ID
                  : null
                : value[1];
            }
          },
        }));

        const { name, age, team, goals } = await prompt(updatePlayerQuestion, {
          onCancel,
        });

        try {
          const updatedFields = await player.update(id, {
            name,
            age,
            team: team || null,
            goals,
          });

          if (updatedFields instanceof Error) {
            return console.log(chalk.red(updatedFields));
          }

          console.log(chalk.green("Jugador modificado correctamente:"));
          return console.table(updatedFields);
        } catch (error) {
          return console.log(chalk.red(error));
        }
      }

      case CRUD.DELETE: {
        const { id } = await prompt({
          name: "id",
          type: "text",
          message: "Ingrese el ID del jugador a eliminar",
        });

        const exist = player.getOne(id);

        if (exist instanceof Error) {
          return console.log(chalk.red(exist.message));
        }

        const { validation } = await prompt({
          name: "validation",
          type: "toggle",
          message: `¿Seguro que desas eliminar a ${exist.name} ?`,
          initial: true,
          active: "Si",
          inactive: "No",
        });

        if (validation) {
          try {
            await player.delete(id);
            return console.log(chalk.green("Jugador eliminado exitosamente"));
          } catch (error) {
            return console.log(chalk.red("Algo salió mal"));
          }
        } else {
          return console.log(chalk.blue("Operación cancelada"));
        }
      }
    }
  });

/***  TEAMS COMMAND  ***/

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
      case CRUD.CREATE: {
        const { name, country, foundation, titles } = await prompt(
          teamQuestions,
          { onCancel }
        );

        try {
          team.create({ name, country, foundation, titles });
          return console.log(chalk.green("Equipo creado exitosamente"));
        } catch (error) {
          return console.log(chalk.red(error));
        }
      }

      case CRUD.READ: {
        const teams = team.getAll();

        return console.table(teams);
      }

      case CRUD.READ_ONE: {
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
    }
  });

program.parse();

const onCancel = () => {
  console.log(chalk.red("Upss, has cancelado la operación"));
  process.exit(1);
};
