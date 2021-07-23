const { statusEmbed } = require("../helpers");
const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    return message.channel.send(statusEmbed(games[message.channel.id]));
  } else {
    return message.channel.send("No game in this channel.");
  }
}

module.exports = {
  name: "status",
  aliases: ["statusreport"],
  execute,
};
