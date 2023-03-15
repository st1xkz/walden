const fs = require("fs");
const path = require("node:path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  ActivityType,
} = require("discord.js");
require("dotenv").config();
const TOKEN = process.env["TOKEN"];
const moment = require("moment");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const readCommands = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      readCommands(filePath);
    } else if (file.endsWith(".js")) {
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
};
readCommands(commandsPath);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: `Something went wrong during invocation of command \`${interaction.commandName}\`.`,
      });
    } else {
      await interaction.reply({
        content: `Something went wrong during invocation of command \`${interaction.commandName}\`.`,
      });
    }
  }
});

client.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.startTime = moment();
  client.user.setPresence({
    activities: [
      {
        name: `the continents! | ${client.guilds.cache.size} servers`,
        type: ActivityType.Watching,
      },
    ],
    status: "online",
  });
});

client.login(TOKEN);
