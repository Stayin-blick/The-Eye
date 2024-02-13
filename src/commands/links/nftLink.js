const { Client, Interaction, EmbedBuilder } = require('discord.js');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("W.O.G NFT's on MagicEden Marketplace")
      .setDescription("Click [here](https://magiceden.io/marketplace/yoooodegens?attributes=%7B%22BACKGROUND%22%3A%5B%22Black%22%5D%7D) to check out the NFT's.")
      .setColor("#FFC300") 

    interaction.reply({ embeds: [embed] });
  },

  name: 'nft-link',
  description: 'Check out the W.O.G NFT\'s on MagicEden Marketplace!',
}
