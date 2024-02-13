const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const mentionable = interaction.options.get("target-user").value;
    const duration = interaction.options.get("duration").value; //
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.editReply("that user doesnt exist in this server");
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply("i cant time out a bot");
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply("please provide a valid duration");
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply(
        "timeout duration cannot be less than 5 seconds or more than 28 days "
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; //highest role of target user
    const requestUserRolePosition = interaction.member.roles.highest.position; //highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; //highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "you cant timeout that user because they have the same/higher role than you"
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I cant timeout that user because they have the same/higher role than me"
      );
      return;
    }

    //timeout the user

    try {
      const { default: prettyms } = await import("pretty-ms");

      if (targetUser.communicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyms(
          msDuration,
          { verbose: true }
        )}
                \nReason: ${reason} `);
        return;
      }

      await targetUser.timeout(msDuration, reason);
      await interaction.editReply(
        `${targetUser} was timed out ${prettyms(msDuration, {
          verbose: true,
        })}\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`there was an error when timing out: ${error}`);
    }
  },

  name: "timeout",
  description: "timeout a user",
  options: [
    {
      name: "target-user",
      description: "The user you want to timeout",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "duration",
      description: "duration of timeout (30m, 1h, 1 day).",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "reason",
      description: "reason for timeout",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],
};
