module.exports = {
  name: "ping",
  description: "Pong!",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply("Pong!");
  },
};
