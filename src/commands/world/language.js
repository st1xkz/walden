const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("Change the language of the bot"),
  async execute(interaction) {
    await interaction.reply("this will be a language command");
  },
};
