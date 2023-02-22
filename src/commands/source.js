const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const os = require("os");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription(
      "Displays a link to the bot's GitHub page or a specific command"
    )
    .addStringOption((option) =>
      option
        .setName("cmd")
        .setDescription("the command to get the source for")
        .setRequired(false)
    ),
  async execute(interaction) {
    const _cmd = interaction.client.commands.get(
      interaction.options.getString("cmd")
    );
    const sourceURL = "https://github.com/st1xkz/walden";
    const branch = "main";
    const license_ = require("fs").readFileSync("./LICENSE", "utf-8");

    if (!_cmd) {
      await interaction.reply(`<${sourceURL}>`);
      return;
    }

    const commandSourceFile = `${sourceURL}/blob/main/src/commands/${_cmd}.js`;
    const obj = interaction.client.commands.get(
      interaction.options.getString("cmd").replace(".", " ")
    );
    if (obj === null) {
      await interaction.reply(`Could not find command called \`${_cmd}.\``);
      return;
    }

    const src = obj.callback.toString();
    var filename = obj.callback.__filename;
    const module = obj.callback.__module;

    var filename = fs.getFileName(src);
    const lines = fs.getLineNumber(lines);
    if (!module.startsWith("discord")) {
      if (filename === null) {
        await interaction.reply(
          `Could not find source for command \`${_cmd}\`.`
        );
        return;
      }
      var location = os.path.relpath(filename).replace("\\", "/");
    } else {
      var location = module.replace(".", "/") + ".js";
    }

    await interaction.reply(
      `<${sourceURL}/blob/${branch}/${location}#L${lines}-L${
        lines + length(filename) - 1
      }>`
    );
  },
};
