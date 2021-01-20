const Discord = require("discord.js");
const bot = new Discord.Client();

const ascii = require("ascii-table");

module.exports = (program) => {
  const cmd = program.command("guild");

  cmd
    .command("info")
    .arguments("<id>")
    .description("info about a guild")
    .action(async (id) => {
      bot.once("ready", async () => {
        let guild = await bot.guilds.fetch(id);
        let table = new ascii(guild.name);
        let owner = await bot.users.fetch(guild.ownerID);

        table.addRow("Owner", owner.tag, "ownerID", guild.ownerID);
        table.addRow("members count", guild.memberCount);
        console.log(table.toString());
        bot.destroy();
        process.exit(1);
      });
      await bot.login(process.env.TOKEN);
    });

  cmd
    .command("list")
    .arguments("<id>")
    .description("detailed datas of a guild")
    .action(async (id) => {
      bot.once("ready", async () => {
        let guild = await bot.guilds.fetch(id);

        // * voice Channels
        let voiceChannels = guild.channels.cache.filter(
          (channel) => channel.type === "voice"
        );
        let voiceChannelsTable = new ascii(
          guild.name + " | Voice Channels"
        ).setHeading("id", "name", "members");
        voiceChannels.forEach((channel) =>
          voiceChannelsTable.addRow(
            channel.id,
            channel.name,
            channel.members.map((m) => m.user.tag).join(", ") || "none"
          )
        );

        // * text channels
        let textChannels = guild.channels.cache.filter(
          (channel) => channel.type === "text"
        );
        let textChannelsTable = new ascii(
          guild.name + " | Text Channels"
        ).setHeading("id", "name");
        textChannels.forEach((channel) =>
          textChannelsTable.addRow(channel.id, channel.name)
        );

        console.log(voiceChannelsTable.toString());
        console.log(textChannelsTable.toString());
        bot.destroy();
        process.exit(1);
      });
      await bot.login(process.env.TOKEN);
    });

  return cmd;
};
