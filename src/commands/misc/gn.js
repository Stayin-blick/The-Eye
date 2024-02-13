module.exports = {
  name: "gn",
  description: "replies with good night.",

  callback: (client, interaction) => {
    interaction.reply(`Good Night <@${interaction.user.id}>.`);
  },
};
