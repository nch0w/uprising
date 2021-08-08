const { commandsEmbed } = require("../helpers");
const { games, backup } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    return message.channel.send(commandsEmbed(backup[message.channel.id]));
  } else {
    return message.channel.send("No game in this channel.");
  }
}

module.exports = {
  name: "backup",
  aliases: ["commands", "history", "bu"],
  execute,
};
