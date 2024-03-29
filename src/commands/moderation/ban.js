const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("that user doesnt exist in that server.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("you cant ban the owner");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; //highest role of target user
    const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "you cant ban that user because they have the same/higher role than you"
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I cant ban that user because they have the same/higher role than me"
      );
      return;
    }

    //ban the taret user
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `user ${targetUser} was banned\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`there was an error when banning: ${error}`);
    }
  },

  name: "ban",
  description: "Bans a member from the server.",
  options: [
    {
      name: "target-user",
      description: "The user you want to ban",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "reason for banning",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
};
