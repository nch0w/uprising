const { games, backup } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    delete games[message.channel.id];
    delete backup[message.channel.id];
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
