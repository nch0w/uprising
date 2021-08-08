const { games, backup } = require("../models");
const _ = require("underscore");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    const laststate = backup[message.channel.id].pop();
    const lastaction = laststate.action;
    const lastuser = laststate.user;
    console.log(laststate.state.players[0].user);
    console.log(games[message.channel.id].players[0].user);
    console.log(
      laststate.state.players[0].user ===
        games[message.channel.id].players[0].user
    );
    games[message.channel.id] = deepCopier(
      backup[message.channel.id].slice(-1)[0].state
    );
    return message.channel.send(
      `Previous command (<@${lastuser.id}>'s ${lastaction}) undone.`
    );
  } else {
    return message.channel.send("No game to undo an action in.");
  }
}

module.exports = {
  name: "undo",
  aliases: [],
  execute,
};
