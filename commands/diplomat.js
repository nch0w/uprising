const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (message.mentions.members.first()) {
      let person = message.author;
      let targetperson = message.mentions.members.first().user;
      if (
        message.mentions.members.first().user !==
        message.mentions.members.last().user
      ) {
        person = message.mentions.members.first().user;
        targetperson = message.mentions.members.last().user;
      }
      const player = games[message.channel.id].players.find(
        (element) => element.user === person
      );
      const target = games[message.channel.id].players.find(
        (element) => element.user === targetperson
      );
      if (player && target) {
        if (player.tokens >= parseInt(args[0]) && target.revealed === "?") {
          player.tokens = player.tokens - parseInt(args[0]);
          target.countrytokens = target.countrytokens + parseInt(args[0]);
          message.channel.send(
            `<@${player.id}> claimed Diplomat to place **${args[0]} tokens** on <@${target.id}>'s Country Card, blocking it from being revealed.\nThey now have **${player.tokens}**.`
          );
          backup[message.channel.id].push({
            state: deepCopier(games[message.channel.id]),
            action: "diplomat",
            user: person,
          });
        } else {
          return message.channel.send("Invalid parameters.");
        }
      } else {
        return message.channel.send("User or target not a player in game.");
      }
    } else {
      return message.channel.send("No target.");
    }
  } else {
    return message.channel.send("No game to do an uprising in.");
  }
}

module.exports = {
  name: "diplomat",
  aliases: ["diplomatblock", "diplo", "diploblock", "db", "dm", "dmb"],
  execute,
};
