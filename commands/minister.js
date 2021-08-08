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
      player.tokens = player.tokens + 3;
      message.channel.send(
        `<@${player.id}> claimed Minister and recieved **3 tokens**.\n They now have **${player.tokens}**.`
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
  name: "minister",
  aliases: ["m"],
  execute,
};
