const Discord = require("discord.js");
const bot = new Discord.Client();

const ascii = require("ascii-table");

const { Command } = require("commander");
const program = new Command();

program.version("1..0").description("A simple cli for discord.js")
.requiredOption("-t, --token <token>", "token of the bot", setToken);

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(program);
});

// program.on("command:*", function (operands) {
//   console.error(`error: unknown command '${operands[0]}'`);
//   const availableCommands = program.commands.map((cmd) => cmd.name());
//   mySuggestBestMatch(operands[0], availableCommands);
//   process.exitCode = 1;
// });

program.parse(program.arvg);

// functions
function setToken(token) {
  process.env.TOKEN = token;
}
