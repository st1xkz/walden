const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the ping/latency of the bot"),
  async execute(interaction) {
    // Send the initial reply and remember the timestamp
    const reply = await interaction.reply({
      content: `Pong! 🏓\nWs Latency: **${interaction.client.ws.ping}ms**`,
      fetchReply: true,
    });
    const replyTimestamp = reply.createdTimestamp;

    // Edit the initial reply with the updated latency
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply({
      content: `Pong! 🏓\nGateway: **${interaction.client.ws.ping}ms**\nREST: **${ping}ms**`,
    });
  },
};
