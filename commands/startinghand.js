const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    const player = games[message.channel.id].players.find(
      (element) => element.user.user === message.author
    );
    if (player) {
      for (let i = 0; i < 3; i++) {
        player.cards.push(games[message.channel.id].deck.pop());
      }
      message.author.send(
        `Your starting hand is:\n${player.cards[0]}, ${player.cards[1]}, ${player.cards[2]}`
      );
      return message.channel.send("Starting hand set!");
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to set hand for.");
  }
}

module.exports = {
  name: "startinghand",
  aliases: [],
  execute,
};
