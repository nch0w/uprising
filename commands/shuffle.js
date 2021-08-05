const { games, backup } = require("../models");
const _ = require("underscore");

function execute(message, args, user) {
  backup[message.channel.id] = JSON.parse(
    JSON.stringify(games[message.channel.id])
  );
  if (message.channel.id in games) {
    games[message.channel.id].deck = _.shuffle(games[message.channel.id].deck);
    return message.channel.send("Deck shuffled.");
  } else {
    return message.channel.send("No game to shuffle a deck in.");
  }
}

module.exports = {
  name: "shuffle",
  aliases: [],
  execute,
};
