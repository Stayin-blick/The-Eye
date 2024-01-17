require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'gm') {
        interaction.reply('morning');
    }

    if (interaction.commandName === 'gn') {
        interaction.reply('night');
    }

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`)
    }

    if (interaction.commandName === 'nft-link') {
      const embed = new EmbedBuilder()
        .setTitle("Magiceden - Wall Of Gains")
        .setDescription("Link to buy Wall Of Gains NFT's.")
        .setColor("Random")
        .setURL("https://magiceden.io/marketplace/yoooodegens?attributes=%7B%22BACKGROUND%22%3A%5B%22Black%22%5D%7D");
        
        interaction.reply({embeds: [embed] })
    }
})

client.login(process.env.TOKEN);
