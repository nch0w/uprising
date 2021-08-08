const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

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
      for (let i = 0; i < 3; i++) {
        player.cards.push(games[message.channel.id].deck.pop());
      }
      person.send(
        `Your starting hand is:\n${player.cards[0]}, ${player.cards[1]}, ${player.cards[2]}`
      );
      message.channel.send("Starting hand set!");
      backup[message.channel.id].push({
        state: deepCopier(games[message.channel.id]),
        action: "startinghand",
        user: person,
      });
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to set hand for.");
  }
}

module.exports = {
  name: "startinghand",
  aliases: ["sh"],
  execute,
};
