/*
Easy FiveM Server Status Bot
Developed by real7lab
discord.gg/visionn 
*/

const fs = require('fs');
const { Client, Intents, Collection } = require("discord.js");
const config = require("./config.json");
require('events').EventEmitter.prototype._maxListeners = 100;

const { loadCommands } = require('./commands');

//// CLIENT
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_INVITES
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.config = config;
module.exports = client;

//// COMMANDS
client.commands = new Collection();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, config);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true
    });
  }
});

client.once('ready', () => {
  loadCommands(client).then(() => {
    console.log(`Bot is ready!`);
  });
});

//// TOKEN LOGIN
client.login(config.token);

// Anti-crash
process.on('unhandledRejection', handleError);
process.on('uncaughtException', handleError);
process.on('uncaughtExceptionMonitor', handleError);

function handleError(error) {
  console.error('Unhandled error:', error);
}
