const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (message.mentions.users.array().length > 1) {
      let person = message.author;
      let targetperson = message.mentions.members.first().user;
      let targetperson2 = message.mentions.members.last().user;
      if (message.mentions.users.array().length > 2) {
        person = message.mentions.users.array()[0];
        targetperson = message.mentions.users.array()[1];
        targetperson2 = message.mentions.users.array()[2];
      }
      const player = games[message.channel.id].players.find(
        (element) => element.user === person
      );
      const target = games[message.channel.id].players.find(
        (element) => element.user === targetperson
      );
      const target2 = games[message.channel.id].players.find(
        (element) => element.user === targetperson2
      );
      if (player && target && target2) {
        if (player.tokens > 1) {
          player.tokens = player.tokens - 2;
          player.comm = { status: "(Commissarred)", count: 1 };
          target.comm = { status: "(Commissarred)", count: 0 };
          target2.comm = { status: "(Commissarred)", count: 0 };
          message.channel.send(
            `<@${player.id}> claimed Commissar to block <@${target.id}>, <@${target2.id}>, and themselves from drawing tokens from the Reserve next action.`
          );
          backup[message.channel.id].push({
            state: deepCopier(games[message.channel.id]),
            action: "commissar2",
            user: person,
          });
        } else {
          return message.channel.send("Insufficient funds.");
        }
      } else {
        return message.channel.send("User or targets not a player in game.");
      }
    } else {
      return message.channel.send("No targets.");
    }
  } else {
    return message.channel.send("No game to uphold Communism in.");
  }
}

module.exports = {
  name: "commissar2",
  aliases: ["cm2"],
  execute,
};
