const Discord = require("discord.js");

module.exports.statusEmbed = (game) => {
  const description = `Countries in Play: ${game.players
    .map((p) => p.country)
    .join(", ")}\n\n${game.players
    .map((p) => `<@${p.uid}>: ${p.cards.length()} Cards, ${p.tokens} Tokens`)
    .join("\n")}`;

  return new Discord.MessageEmbed()
    .setTitle("Uprising Status")
    .setDescription(description);
};
