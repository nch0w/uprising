const { games } = require("../models");

function execute(message, args, user) {
  if (!user.isOwner) return;
  if (message.channel.id in games) {
    return message.channel.send(
      `**Remaining Cards in Deck:**\n${games[message.channel.id].deck.join(
        ", "
      )}`
    );
  } else {
    return message.channel.send("No game to reveal cards in.");
  }
}

module.exports = {
  name: "revealcards",
  aliases: [],
  execute,
};
