const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function buttonPages(interaction, pages) {
  let currentPage = 0;
  const totalPages = pages.length;

  const firstButton = new ActionRowBuilder()
    .setCustomId("first")
    .setEmoji("<:first:1081828593270804571>")
    .setStyle(ButtonStyle.Secondary);

  const prevButton = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji("<:previous:1081828598433992825>")
    .setStyle(ButtonStyle.Primary);

  const nextButton = new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("<:next:1081828596844339251>")
    .setStyle(ButtonStyle.Primary);

  const lastButton = new ButtonBuilder()
    .setCustomId("last")
    .setEmoji("<:last:1081828595607011328>")
    .setStyle(ButtonStyle.Secondary);

  const buttons = new ActionRowBuilder().addComponents(
    firstButton,
    prevButton,
    nextButton,
    lastButton
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

function sourcePages(interaction, pages, attachments = []) {
  let currentPage = 0;
  const totalPages = pages.length;

  const prevButton = new ButtonBuilder()
    .setCustomId("previous")
    .setEmoji("<:previous:1081828598433992825>")
    .setStyle(ButtonStyle.Primary);

  const nextButton = new ButtonBuilder()
    .setCustomId("next")
    .setEmoji("<:next:1081828596844339251>")
    .setStyle(ButtonStyle.Primary);

  const buttons = new ActionRowBuilder().addComponents(prevButton, nextButton);

  let embed = pages[currentPage];
  if (embed.image && attachments[currentPage] !== undefined) {
    embed.setImage(`attachment://${attachments[currentPage].name}`);
  }

  interaction
    .reply({
      embeds: [embed],
      components: [buttons],
      files:
        attachments[currentPage] !== undefined
          ? [attachments[currentPage]]
          : [],
    })
    .catch(console.error);

  const collector = interaction.channel.createMessageComponentCollector({
    filter: (i) => i.user.id === interaction.user.id,
    time: 300000, // 5 minute timeout
  });

  collector.on("collect", (interaction) => {
    if (interaction.customId === "previous") {
      currentPage--;
      if (currentPage < 0) currentPage = 0;
      let embed = pages[currentPage];
      if (embed.image && attachments[currentPage] !== undefined) {
        embed.setImage(`attachment://${attachments[currentPage].name}`);
      }
      interaction
        .update({
          embeds: [embed],
          components: [buttons],
          files:
            attachments[currentPage] !== undefined
              ? [attachments[currentPage]]
              : [],
        })
        .catch(console.error);
    } else if (interaction.customId === "next") {
      currentPage++;
      if (currentPage >= totalPages) currentPage = totalPages - 1;
      let embed = pages[currentPage];
      if (embed.image && attachments[currentPage] !== undefined) {
        embed.setImage(`attachment://${attachments[currentPage].name}`);
      }
      interaction
        .update({
          embeds: [embed],
          components: [buttons],
          files:
            attachments[currentPage] !== undefined
              ? [attachments[currentPage]]
              : [],
        })
        .catch(console.error);
    }
  });

  collector.on("end", (collected) => {
    interaction.editReply({ components: [] }).catch(console.error);
    console.log(`Collected ${collected.size} interactions.`);
  });

  collector.on("error", (err) => {
    console.error(err);
  });
}

module.exports = { buttonPages, sourcePages };
