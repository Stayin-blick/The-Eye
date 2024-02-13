module.exports = {
  name: 'gm',
  description: 'replies with morning.',


  callback: (client, interaction) => {
    interaction.reply(`Morning <@${interaction.user.id}>.`);
  },
};
