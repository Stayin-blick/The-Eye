const { Client, Interaction } = require("discord.js");
const User = require("../../models/User");

const dailyAmount = 100;
const baseMultiplier = 1;
const streakMultiplierIncrement = 0.05;

module.exports = {
  name: "daily",
  description: "collect daily reqard",
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "you can only run this command inside a server",
        ephemeral: true,
      });
      return;
    }

    try {
      await interaction.deferReply();

      let query = {
        userId: interaction.member.id,
        guildId: interaction.guild.id,
      };

      let user = await User.findOne(query);

      if (user) {
        const lastDailyDate = user.lastDaily.toDateString();
        const currentDate = new Date().toDateString();

        if (lastDailyDate === currentDate) {
          interaction.editReply("you have already collected your daily");
          return;
        }

        let streakMultiplier =
          baseMultiplier + (user.streak - 1) * streakMultiplierIncrement;

        user.balance += dailyAmount * streakMultiplier;

        if (
          lastDailyDate ===
          new Date(user.lastDaily.getTime() + 86400000).toDateString()
        ) {
          user.streak += 1;
        } else {
          user.streak = 1;
        }
        user.lastDaily = new Date();
      } else {
        user = new User({
          ...query,
          lastDaily: new Date(),
          streak: 1,
        });
      }

      user.balance += dailyAmount;
      await user.save();

      interaction.editReply(
        `${dailyAmount} was added to your balance. you now have ${user.balance}`
      );
    } catch (error) {
      console.log(`error with /daily: ${error}`);
    }
  },
};
