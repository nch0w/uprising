const { games, defaultDeck } = require("../models");
const _ = require("underscore");

function execute(message, args, user) {
  if (message.channel.id in games) {
    return message.channel.send("There is already a game in this channel.");
  } else {
    games[message.channel.id] = {
      players: [],
      turn: 0,
      deck: _.shuffle(defaultDeck),
      trade: { trader: [], card: [], source: "" },
      holding: 0,
      activist: 0,
    };
    return message.channel.send("Game created.");
  }
}

module.exports = {
  name: "newgame",
  aliases: ["ng"],
  execute,
};
