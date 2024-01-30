module.exports = {
  name: 'gn',
  description: 'replies with good night.',
  // devonly: Boolean,
  testonly: true,
  // options:Object[],

  callback: (client, interaction) => {
    interaction.reply(`Good Night ${client.ws.gn}ms`);
  },
};
