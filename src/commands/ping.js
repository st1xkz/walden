const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Displays the ping/latency of the bot"),
  async execute(interaction) {
    // Check the heartbeat latency of the bot
    await interaction
      .reply({
        content: `Pong! 🏓\nWs Latency: **${interaction.client.ws.ping}ms**`,
        fetchReply: true,
      })
      .then((resultMessage) => {
        const ping =
          resultMessage.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(
          `Pong! 🏓\nGateway: **${interaction.client.ws.ping}ms**\nREST: **${ping}ms**`
        );
      });
  },
};
