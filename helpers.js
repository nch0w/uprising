const Discord = require("discord.js");
const _ = require("underscore");

module.exports.statusEmbed = (game) => {
  const description = `Countries in Play: ${_.shuffle(
    game.players.map((p) => p.country)
  ).join(", ")}\nHolding Area: ${game.holding}\nActivists: ${
    game.activist
  }/4\nROK Trades: ${game.trade.counter}/${Math.min(
    Math.max(game.revealed.asians - 2, 1),
    2
  )}\n\n${game.players
    .map(
      (p) =>
        `${p.indicator}<@${p.id}> (${p.revealed}): ${p.cards.length} Cards, ${
          p.tokens
        } Tokens, ${p.counters} Counters, ${p.countrytokens} Blockers ${
          p.entre.status
        }\nDropped: ${p.dropped.join(", ")}`
    )
    .join("\n")}`;

  return new Discord.MessageEmbed()
    .setTitle("Uprising Status")
    .setDescription(description);
};
