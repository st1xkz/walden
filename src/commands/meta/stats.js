const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const moment = require("moment");
const osu = require("node-os-utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Displays the bot's information"),
  async execute(interaction) {
    if (!interaction.guild) {
      return;
    }
    if (!interaction.guild.members.me) {
      return;
    }
    if (!interaction.user) {
      return;
    }

    const uptime = moment
      .duration(moment().diff(interaction.client.startTime))
      .humanize();
    const count = osu.cpu.count();

    const embed = new EmbedBuilder()
      .setColor(0xbe9ad4)
      .setTitle("Statistics for Walden")
      .setDescription(
        `Guild Count: **${interaction.client.guilds.cache.size}**\n` +
          `User Count: **${interaction.client.guilds.cache.reduce(
            (acc, guild) => acc + guild.memberCount,
            0
          )}**\n` +
          `Command Count: **${interaction.client.commands.size}**\n\n` +
          `Uptime: **${uptime}**\n` +
          `CPU Time: **${await osu.cpu.usage().then(osu.cpuPercentage)}**\n` +
          `Memory Usage: **${await osu.mem
            .info()
            .then((obj) => obj.usedMemMb)}/${await osu.mem
            .info()
            .then((obj) => obj.totalMemMb)} MiB (${await osu.mem
            .info()
            .then((obj) => obj.freeMemPercentage)}%)**\n\n` +
          `Platform: **${
            process.platform.charAt(0).toUpperCase() + process.platform.slice(1)
          }**\n` +
          `Language: **JavaScript**\n` +
          `Library: **discord.js v${version}**\n` +
          `Node version: **${process.version}**`
      )
      .setTimestamp()
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: "Bot developed by sticks#5822" });
    await interaction.reply({ embeds: [embed] });
  },
};
