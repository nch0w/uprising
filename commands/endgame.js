const { games } = require("../models");

function execute(message, args, user) {
  if (!user.isOwner) return;
  if (message.channel.id in games) {
    delete games[message.channel.id];
    return message.channel.send("Game ended.");
  } else {
    return message.channel.send("No game to end.");
  }
}

module.exports = {
  name: "endgame",
  aliases: ["eg"],
  execute,
};
