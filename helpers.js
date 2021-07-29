const Discord = require("discord.js");

module.exports.statusEmbed = (game) => {
  const description = `Countries in Play: ${game.players
    .map((p) => p.country)
    .join(", ")}\nHolding Area: ${game.holding}\n\n${game.players
    .map(
      (p) =>
        `<@${p.id}> (${p.revealed}): ${p.cards.length} Cards, ${
          p.tokens
        } Tokens\nDropped: ${p.dropped.join(", ")}`
    )
    .join("\n")}`;

  return new Discord.MessageEmbed()
    .setTitle("Uprising Status")
    .setDescription(description);
};
