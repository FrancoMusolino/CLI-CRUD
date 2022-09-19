import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program.name("CLI APP").description("A simple CLI CRUD APP").version("1.0.0");

program
  .command("players")
  .description("Administra los jugadores de fútbol")
  .action(() => console.log(chalk.green("Bienvenido paaa")));

program.parse();
