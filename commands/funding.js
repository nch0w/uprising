const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    const player = games[message.channel.id].players.find(
      (element) => element.user === person
    );
    if (player) {
      if (player.tokens > 0) {
        player.tokens = player.tokens - 1;
        games[message.channel.id].holding =
          games[message.channel.id].holding + 1;
        const newcard = games[message.channel.id].deck.shift();
        player.cards.push(newcard);
        person.send(
          `You drew a ${newcard}.\nYour hand is now: ${player.cards.join(
            ", "
          )}.`
        );
        return message.channel.send(
          `<@${player.id}> used Funding to pay **1 token** into the Holding Area in exchange for one card from the deck (they must return a card now). They now have **${player.tokens}**.`
        );
      } else {
        return message.channel.send("Insufficient funds.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to use funding in.");
  }
}

module.exports = {
  name: "funding",
  aliases: [],
  execute,
};
