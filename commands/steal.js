const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (
      args.length > 1 &&
      parseInt(args[0]) > 0 &&
      message.mentions.members.first()
    ) {
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
        if (target.tokens >= parseInt(args[0])) {
          player.tokens = player.tokens + parseInt(args[0]);
          target.tokens = target.tokens - parseInt(args[0]);
          return message.channel.send(
            `<@${player.id}> stole **${args[0]} tokens** from <@${target.id}>! They now have **${player.tokens}** and **${target.tokens}** respectively.`
          );
        } else {
          return message.channel.send(
            `<@${target.id}> has insufficient funds.`
          );
        }
      } else {
        return message.channel.send("User or target not a player in game.");
      }
    } else {
      return message.channel.send("Invalid parameters.");
    }
  } else {
    return message.channel.send("No game to do an uprising in.");
  }
}

module.exports = {
  name: "steal",
  aliases: [],
  execute,
};
