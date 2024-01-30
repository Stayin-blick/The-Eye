const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: 'ban',
  description: 'Bans a member from the server.',
  // devonly: Boolean,
  // testonly: Boolean,
  options: [
    {
      name: 'target_user',
      description: "The user you want to ban",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: "reason for banning",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply("ban..");
  },
};
