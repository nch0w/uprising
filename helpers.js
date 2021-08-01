const Discord = require("discord.js");
const _ = require("underscore");

module.exports.statusEmbed = (game) => {
  const description = `Countries in Play: ${_.shuffle(
    game.players.map((p) => p.country)
  ).join(", ")}\nHolding Area: ${game.holding}\nActivist: ${
    game.activist
  }/4\n\n${game.players
    .map(
      (p) =>
        `${p.indicator}<@${p.id}> (${p.revealed}): ${p.cards.length} Cards, ${
          p.tokens
        } Tokens, ${p.countrytokens} Blockers ${
          p.entre.status
        }\nDropped: ${p.dropped.join(", ")}`
    )
    .join("\n")}`;

  return new Discord.MessageEmbed()
    .setTitle("Uprising Status")
    .setDescription(description);
};
