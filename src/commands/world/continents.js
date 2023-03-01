const {
  ActionRowBuilder,
  Events,
  StringSelectMenuBuilder,
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("continent")
    .setDescription("Shows information on the continent that was selected"),
  async execute(interaction) {
    const file = new AttachmentBuilder("assets/continents/af/globe_af.png");
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("continents")
        .setPlaceholder("Select a continent")
        .addOptions(
          {
            label: "Africa",
            value: "first_option",
          },
          {
            label: "Asia",
            value: "second_option",
          },
          {
            label: "Europe",
            value: "third_value",
          },
          {
            label: "North America",
            value: "fourth_value",
          },
          {
            label: "South America",
            value: "fifth_value",
          },
          {
            label: "Antarctica",
            value: "sixth_value",
          },
          {
            label: "Oceania",
            value: "seventh_value",
          }
        )
    );

    await interaction.reply({
      content: "Please select a continent:",
      components: [row],
    });

    const filter = (interaction) =>
      interaction.customId === "continents" &&
      interaction.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", (interaction) => {
      // Get the selected option
      const selectedOption = interaction.values.find(
        (option) => option.value === interaction.values[0]
      );

      // Create an embed with information about the selected option
      const embed = new EmbedBuilder()
        .setTitle("Africa")
        .setDescription(`stuff`)
        .setThumbnail("attachment://globe_af.png");

      // Update the original message with the embed
      interaction.update({
        content: "",
        components: [row],
        embeds: [embed],
        files: [file],
      });
      console.log(`User selected ${interaction.values} from the select menu.`);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} interactions.`);
      return;
    });
  },
};
