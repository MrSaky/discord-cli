require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();

const ascii = require("ascii-table");

module.exports = (program) => {
  const cmd = program.command("bot");

  cmd
    .command("info")
    .description("info about the bot")
    .action(async () => {
      bot.once("ready", async () => {
        let table = new ascii(bot.user.tag);

        table.addRow("id", bot.user.id);
        table.addRow("token", bot.token);
        table.addRow("guilds number", bot.guilds.cache.size);

        console.log(table.toString());
        bot.destroy();
        process.exit(1);
      });
      await bot.login(process.env.TOKEN);
    });

  cmd
    .command("guilds")
    .description("Guilds where the bot is")
    .action(async (id) => {
      bot.once("ready", async () => {
        let table = new ascii(bot.user.username + " | Guild(s)");
        let guilds = bot.guilds.cache;

        guilds.forEach((guild) => {
          table
            .setHeading("Name", "guild id", "Member count")
            .addRow(guild.name, guild.id, guild.memberCount);
        });
        console.log(table.toString());
        bot.destroy();
        process.exit(1);
      });
      await bot.login(process.env.TOKEN);
    });
  return cmd;
};
