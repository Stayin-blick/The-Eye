const { Client, IntentsBitField } = require("discord.js");

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
})

client.login(
  "MTE5NzE3ODg2MjYyMzI2MDg2Mg.GT5H19.-Vhv5enWX-wug9wLfPjfG3XmDq9DgW7q5Xq_nI"
);
