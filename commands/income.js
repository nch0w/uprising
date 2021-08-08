const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    const player = games[message.channel.id].players.find(
      (element) => element.user === person
    );
    if (player) {
      player.tokens = player.tokens + 1;
      message.channel.send(
        `<@${player.id}> took Income and now has **${player.tokens}**.`
      );
      backup[message.channel.id].push({
        state: deepCopier(games[message.channel.id]),
        action: "income",
        user: person,
      });
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to take income in.");
  }
}

module.exports = {
  name: "income",
  aliases: ["i"],
  execute,
};
