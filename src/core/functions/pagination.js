const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function buttonPages(interaction, pages) {
  let currentPage = 0;
  const totalPages = pages.length;

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("first")
        .setEmoji("<:first:1081828593270804571>")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setEmoji("<:previous:1081828598433992825>")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("next")
        .setEmoji("<:next:1081828596844339251>")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("last")
        .setEmoji("<:last:1081828595607011328>")
        .setStyle(ButtonStyle.Secondary)
    );

  const embed = pages[currentPage];

  interaction.reply({ embeds: [embed], components: [buttons] });

  const collector = interaction.channel.createMessageComponentCollector({
    time: 300000,
  });

  collector.on("collect", (interaction) => {
    if (interaction.customId === "first") {
      currentPage = 0;
      interaction.update({
        embeds: [pages[currentPage]],
        components: [buttons],
      });
    } else if (interaction.customId === "previous") {
      currentPage--;
      if (currentPage < 0) currentPage = 0;
      interaction.update({
        embeds: [pages[currentPage]],
        components: [buttons],
      });
    } else if (interaction.customId === "next") {
      currentPage++;
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      interaction.update({
        embeds: [pages[currentPage]],
        components: [buttons],
      });
    } else if (interaction.customId === "last") {
      currentPage = totalPages - 1;
      interaction.update({
        embeds: [pages[currentPage]],
        components: [buttons],
      });
    }
  });

  collector.on("end", (collected) => {
    interaction.editReply({ components: [] });
    console.log(`Collected ${collected.size} interactions.`);
  });
}

function sourcePages(interaction, pages) {
  let currentPage = 0;
  const totalPages = pages.length;

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setEmoji("<:previous:1081828598433992825>")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("next")
        .setEmoji("<:next:1081828596844339251>")
        .setStyle(ButtonStyle.Primary)
    );

  const embed = pages[currentPage];

  interaction.reply({ embeds: [embed], components: [buttons] });

  const collector = interaction.channel.createMessageComponentCollector({
    time: 300000,
  });

  collector.on("collect", (interaction) => {
    if (interaction.customId === "previous") {
      currentPage--;
      if (currentPage < 0) currentPage = 0;
      const embed = pages[currentPage];
      interaction.update({
        embeds: [embed],
        components: [buttons],
      });
    } else if (interaction.customId === "next") {
      currentPage++;
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      const embed = pages[currentPage];
      interaction.update({
        embeds: [embed],
        components: [buttons],
      });
    }
  });

  collector.on("end", (collected) => {
    interaction.editReply({ components: [] });
    console.log(`Collected ${collected.size} interactions.`);
  });
}

module.exports = { buttonPages, sourcePages };
