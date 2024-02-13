const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
} = require("discord.js");
const User = require("../../models/User");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "you can only use this command in a server",
        ephemeral: true,
      });
      return;
    }

    const targetUserId =
      interaction.options.get("user")?.value || interaction.member.id;

    await interaction.deferReply();

    const user = await User.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!user) {
      interaction.editReply(`<@${targetUserId}> doesnt have a profile yet `);
      return;
    }

    interaction.editReply(
      targetUserId === interaction.member.id
        ? `your balance is **${user.balance}**`
        : `<@${targetUserId}>'s balance is **${user.balance}**`
    );
  },

  name: "balance",
  description: "see yours or someone elses balance",
  options: [
    {
      name: "user",
      description: "the users balance to want to get",
      type: ApplicationCommandOptionType.User,
    },
  ],
};
