const { games, defaultDeck } = require("../models");
const _ = require("underscore");

function execute(message, args, user) {
  if (message.channel.id in games) {
    return message.channel.send("There is already a game in this channel.");
  } else {
    games[message.channel.id] = {
      players: [],
      revealed: { asians: 0, europeans: 0, neutrals: 0 },
      turn: 0,
      deck: _.shuffle(defaultDeck),
      trade: { trader: [], card: [], source: "", counter: 0 },
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
