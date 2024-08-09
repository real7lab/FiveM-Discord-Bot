const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const FiveM = require('fivem');
const config = require('../config.json');
const client = require('../index');

const rest = new REST({ version: '9' }).setToken(config.token);
const srv = new FiveM.Server(`${config.ipserver}:30120`);
const channelId = ""; 
let statusMessage = "";
let valoriGB = [];

async function getServerInfo(interaction = null) {
  try {
    const response = await axios.get('https://status.cfx.re/api/v2/status.json');
    const statuscfx = response.data.status.description;
    console.log('FiveM API Status:', statuscfx);

    const status = await srv.getServerStatus();
    const players = await srv.getPlayers();
    const maxPlayers = await srv.getMaxPlayers();
    
    let st = status.online ? "Online" : "Offline";
    valoriGB = [players, maxPlayers, st];

    const embed = new MessageEmbed()
      .setColor('#ffdf00')
      .setAuthor('FiveM Server - Status')
      .addFields(
        { name: 'Server IP to write in F8', value: `\`\`\`connect cfx.re/join/\`\`\``, inline: false },
        { name: 'Status', value: `\`\`\`yaml\n${valoriGB[2]}\`\`\``, inline: true },
        { name: 'Online Players', value: `\`\`\`yaml\n${valoriGB[0]}/${valoriGB[1]}\`\`\``, inline: true },
        { name: 'Status Fivem', value: `\`\`\`yaml\n${statuscfx}\`\`\``, inline: false }
      )
      .setFooter('Developed by Lab - github.com/real7lab');

    if (interaction) {
      await interaction.reply({ embeds: [embed], ephemeral: false });
    } else {
      const channel = await client.channels.fetch(channelId);
      const messages = await channel.messages.fetch();
      await channel.bulkDelete(messages);
      await channel.send({ embeds: [embed] }).then(message => statusMessage = message.id);
    }
  } catch (err) {
    console.error('Error in getServerInfo:', err);

    const embed = new MessageEmbed()
      .setColor('#ffdf00')
      .setAuthor('FiveM Server - Status')
      .addFields(
        { name: 'Status', value: '```yaml\nOffline```', inline: true },
        { name: 'Online Players', value: '```yaml\n0/0```', inline: true },
        { name: 'Status Fivem', value: `\`\`\`yaml\n${err.message}\`\`\``, inline: false }
      )
      .setFooter('Developed by Lab - github.com/real7lab');

    if (interaction) {
      await interaction.reply({ embeds: [embed], ephemeral: false });
    } else {
      const channel = await client.channels.fetch(channelId);
      const messages = await channel.messages.fetch();
      await channel.bulkDelete(messages);
      await channel.send({ embeds: [embed] }).then(message => statusMessage = message.id);
    }
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Shows the server status'),
};

getServerInfo();
setInterval(getServerInfo, 20000);
