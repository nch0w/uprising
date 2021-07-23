const { games, defaultDeck } = require("../models");
const _ = require("underscore");

function execute(message, args, user) {
  if (message.channel.id in games) {
    return message.channel.send("There is already a game in this channel.");
  } else {
    games[message.channel.id] = {
      players: [], // {country: "", id: "", cards: [], tokens: 0}
      deck: _.shuffle(defaultDeck),
    };
    return message.channel.send("Game created.");
  }
}

module.exports = {
  name: "newgame",
  aliases: [],
  execute,
};
