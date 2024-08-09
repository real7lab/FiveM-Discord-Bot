const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const client = require('../index'); 

function mapIdentifiers(identifier) {
    if (identifier.startsWith("steam:")) {
        return "Steam";
    } else if (identifier.startsWith("discord:")) {
        return "Discord";
    } else if (identifier.startsWith("license:")) {
        return "Rockstar Licence"   
    } else if (identifier.startsWith("license2:")) {
        return "Rockstar Licence"  
    } else if (identifier.startsWith("xbl:")) {
        return "Xbox identifier"  
    } else if (identifier.startsWith("live:")) {
        return "Microsoft Live identifier"    
    } else if (identifier.startsWith("fivem:")) {
        return "Fivem Account"    
    } else {
        return "Other";
    }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get profile info')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('Specify the profile ID')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('discord_id')
        .setDescription('Specify the Discord ID')
        .setRequired(false)),
  async execute(interaction) {
    try {
      const id = interaction.options.getString('id');
      const discordId = interaction.options.getString('discord_id');

      if (!id && !discordId) {
        await interaction.reply({ content: `Specify an ID`, ephemeral: true });
        return;
      }
      const endpointserver = config.endpointserver.replace('{ipserver}', config.ipserver);
      const response = await axios.get(endpointserver);
      const data = response.data;

      let profileInfo;
      if (id) {
        profileInfo = data.find(info => info.id === parseInt(id));
      } else if (discordId) {
        profileInfo = data.find(info => info.identifiers.includes(`discord:${discordId}`));
      }

      if (!profileInfo) {
        await interaction.reply({ content: `The \`id\` is not in game!`, ephemeral: true });
        return;
      }

      const identifiers = profileInfo.identifiers;

      const embed = new MessageEmbed()
        .setTitle('Profile Info')
        .setColor('#0099ff')
        .addFields(
          { name: 'ID', value: `\`${profileInfo.id}\`` },
          { name: 'Name', value: `\`${profileInfo.name}\`` }
        )
        .setFooter({ text: `Developed by Lab - github.com/real7lab` });

      if (discordId && !id) {
        embed.addFields(
          { name: 'ID Discord:', value: `\`${discordId}\`` }
        );
      }

      identifiers.forEach(identifier => {
        if (!discordId || identifier !== `discord:${discordId}`) {
          embed.addFields(
            { name: `${mapIdentifiers(identifier)}`, value: `\`${identifier}\`` }
          );
        }
      });

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      await interaction.reply('Request Failed');
    }
  },
};
