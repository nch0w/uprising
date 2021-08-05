const { games, backup } = require("../models");
const _ = require("underscore");

function execute(message, args, user) {
  if (message.channel.id in games) {
    games[message.channel.id] = JSON.parse(
      JSON.stringify(backup[message.channel.id])
    );
    console.log(games[message.channel.id]);
    return message.channel.send("Previous command undone.");
  } else {
    return message.channel.send("No game to undo an action in.");
  }
}

module.exports = {
  name: "undo",
  aliases: [],
  execute,
};
