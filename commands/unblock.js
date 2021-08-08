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
      if (player.tokens > 0 && player.countrytokens > 0) {
        player.countrytokens = player.countrytokens - 1;
        player.tokens = player.tokens - 1;
        message.channel.send(
          `@${player.id}> paid **1 token** to remove a blocker from their Country Card.\nThey now have **${player.tokens}**.`
        );
        backup[message.channel.id].push({
          state: deepCopier(games[message.channel.id]),
          action: "unblock",
          user: person,
        });
      } else {
        return message.channel.send("Incorrect parameters.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to unblock Country Cards in.");
  }
}

module.exports = {
  name: "unblock",
  aliases: ["ub", "diplomatunblock", "diplounblock", "dub"],
  execute,
};
