const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  SlashCommandBuilder,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const { sourcePages } = require("../../core/functions/pagination.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("continent")
    .setDescription("Shows information on the continent that was selected"),
  async execute(interaction) {
    const select = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("continents")
        .setPlaceholder("Select a continent")
        .addOptions(
          {
            label: "Africa",
            value: "af",
            emoji: "🪘",
          },
          {
            label: "Asia",
            value: "as",
            emoji: "🍚",
          },
          {
            label: "Europe",
            value: "eu",
            emoji: "🏰",
          },
          {
            label: "North America",
            value: "na",
            emoji: "🦬",
          },
          {
            label: "South America",
            value: "sa",
            emoji: "🦙",
          },
          {
            label: "Antarctica",
            value: "an",
            emoji: "🐧",
          },
          {
            label: "Australia",
            value: "au",
            emoji: "🦘",
          }
        )
    );

    const continents_map = new AttachmentBuilder(
      "assets/continents/continents_map.png"
    ).setName("continents_map.png");

    const continents = new EmbedBuilder()
      .setTitle("Continents")
      .setDescription(
        "A continent is a large continuous mass of land typically viewed as a single region. There are seven continents: Africa, Asia, Europe, North America, South America, Antarctica, and Australia (not listed in any specific order)."
      )
      .setImage("attachment://continents_map.png")
      .setTimestamp()
      .setFooter({ text: "Select a continent to learn more!" });

    const sources = new EmbedBuilder()
      .setTitle("Sources")
      .setDescription(
        "- https://www.britannica.com/science/continent\n" +
        "- https://www.mapsofindia.com/world-map/continents.html"
      );

    const pages = [continents, sources];

    sourcePages(interaction, pages, [continents_map]);

    const filter = (interaction) => interaction.customId === "continents";
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 300000,
    });

    collector.on("collect", (interaction) => {
      // Update the original message with the embed
      console.log(`User selected ${interaction.values} from the select menu.`);
    });

    collector.on("end", (collected) => {
      interaction.editReply({ components: [] });
      console.log(`Collected ${collected.size} interactions.`);
      return;
    });
  },
};
