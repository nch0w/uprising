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
  )}\nFrance Transfers: ${game.france}/${
    game.players.filter(
      (p) =>
        ["USA", "UK", "Germany", "Italy"].includes(p.revealed) &&
        p.cards.length > 0
    ).length * 2
  }\n\n${game.players
    .map(
      (p) =>
        `${p.death}${p.indicator}<@${p.id}> (${p.revealed}): ${
          p.cards.length
        } Cards, ${p.tokens} Tokens, ${p.counters} Counters, ${
          p.countrytokens
        } Blockers ${p.entre.status}${p.comm.status}${
          p.death
        }\nDropped: ${p.dropped.join(", ")}`
    )
    .join("\n")}`;

  return new Discord.MessageEmbed()
    .setTitle("Uprising Status")
    .setDescription(description);
};

module.exports.commandsEmbed = (backup) => {
  const description = `${backup
    .map((b) => `<@${b.user.id}>: ${b.action}`)
    .join("\n")}`;
  return new Discord.MessageEmbed()
    .setTitle("Command History")
    .setDescription(description);
};

module.exports.deepCopier = (gamestate) => {
  var deepCopy = {};
  deepCopy.players = [];
  for (const player of gamestate.players) {
    deepCopy.players.push({
      country: player.country,
      revealed: player.revealed,
      id: player.id,
      user: player.user,
      cards: JSON.parse(JSON.stringify(player.cards)),
      specialcards: JSON.parse(JSON.stringify(player.specialcards)),
      dropped: JSON.parse(JSON.stringify(player.dropped)),
      tokens: player.tokens,
      countrytokens: player.countrytokens,
      counters: player.counters,
      entre: JSON.parse(JSON.stringify(player.entre)),
      comm: JSON.parse(JSON.stringify(player.comm)),
      indicator: player.indicator,
      death: player.death,
    });
  }
  deepCopy.revealed = JSON.parse(JSON.stringify(gamestate.revealed));
  deepCopy.turn = gamestate.turn;
  deepCopy.deck = JSON.parse(JSON.stringify(gamestate.deck));
  deepCopy.trade = {
    trader: gamestate.trade.trader,
    card: JSON.parse(JSON.stringify(gamestate.trade.card)),
    source: gamestate.trade.source,
    counter: gamestate.trade.counter,
  };
  deepCopy.holding = gamestate.holding;
  deepCopy.activist = gamestate.activist;
  deepCopy.france = gamestate.france;
  deepCopy.usa = gamestate.usa;
  return deepCopy;
};
