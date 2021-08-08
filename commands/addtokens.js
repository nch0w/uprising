const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (args.length > 0 && parseInt(args[0]) !== 0) {
      let person = message.author;
      if (message.mentions.members.first()) {
        person = message.mentions.members.first().user;
      }
      const player = games[message.channel.id].players.find(
        (element) => element.user === person
      );
      if (player) {
        player.tokens = player.tokens + parseInt(args[0]);
        if (parseInt(args[0]) >= 0) {
          message.channel.send(
            `<@${player.id}> recieved **${args[0]} token(s)** and now has **${player.tokens}**.`
          );
        } else {
          message.channel.send(
            `<@${player.id}> paid **${-parseInt(
              args[0]
            )} token(s)** and now has **${player.tokens}**.`
          );
        }
        backup[message.channel.id].push({
          state: deepCopier(games[message.channel.id]),
          action: "addtokens",
          user: person,
        });
      } else {
        return message.channel.send("User not a player in game.");
      }
    } else {
      return message.channel.send("Incorrect parameters.");
    }
  } else {
    return message.channel.send("No game to add tokens within.");
  }
}

module.exports = {
  name: "addtokens",
  aliases: ["at"],
  execute,
};
