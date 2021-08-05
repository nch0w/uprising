const { games, backup, defaultDeck } = require("../models");
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
      france: 0,
      usa: 0,
    };
    backup[message.channel.id] = JSON.parse(
      JSON.stringify(games[message.channel.id])
    );
    return message.channel.send("Game created.");
  }
}

module.exports = {
  name: "newgame",
  aliases: ["ng"],
  execute,
};
