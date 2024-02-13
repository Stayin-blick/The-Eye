const {
  ApplicationCommandOptionType,
  Client,
  Interaction,
  PermissionFlagsBits,
} = require("discord.js");
const AutoRole = require("../../models/AutoRole");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild) {
      interaction.reply("you can only use this command in a server");
      return;
    }

    const targetRoleId = interaction.options.get('role').value;

    try {
      await interaction.deferReply();

      let autoRole = await AutoRole.findOne({ guildId: interaction.guild.id });

      if (autoRole) {
        if (autoRole.roleId === targetRoleId) {
          interaction.editReply(
            "auto-role has been configured for that role to disable run `autorole-disable`"
          );
          return;
        }

        autoRole.roleId = targetRoleId;
      } else {
        autoRole = new AutoRole({
          guildId: interaction.guild.id,
          roleId: targetRoleId,
        });
      }

      await autoRole.save();
      interaction.editReply(
        "Autorole has now been configured. to disable run `autorole-disable`"
      );
    } catch (error) {
      console.log(`there was an error in getting role: ${error}`);
    }
  },

  name: 'autorole-congiure',
  description: "configure your auto-role for this server",
  options: [
    {
      name: 'role',
      description: "the role you want users to get on join",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissionsRequired: [PermissionFlagsBits.ManageRoles],
};
