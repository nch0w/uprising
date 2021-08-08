const { games, backup } = require("../models");
const _ = require("underscore");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    games[message.channel.id].deck = _.shuffle(games[message.channel.id].deck);
    message.channel.send("Deck shuffled.");
    backup[message.channel.id].push({
      state: deepCopier(games[message.channel.id]),
      action: "shuffle",
      user: message.author,
    });
  } else {
    return message.channel.send("No game to shuffle a deck in.");
  }
}

module.exports = {
  name: "shuffle",
  aliases: [],
  execute,
};
