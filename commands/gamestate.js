const { gamestateEmbed } = require("../helpers");
const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (games[message.channel.id].mods.includes(message.author)) {
      return message.author.send(gamestateEmbed(games[message.channel.id]));
    } else {
      return message.channel.send("***YOU'RE NOT MY REAL DAD***");
    }
  } else {
    return message.channel.send("No game in this channel.");
  }
}

module.exports = {
  name: "gamestate",
  aliases: ["gs", "fullreport"],
  execute,
};
