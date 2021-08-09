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
        if (
          player.revealed === "Switzerland" &&
          player.tokens > 3 &&
          games[message.channel.id].players.filter((p) => p.cards.length > 0)
            .length > 4
        ) {
          player.tokens = player.tokens - 4;
          person.send(
            `<@${target.id}>'s country is **${
              target.country
            }**, and their hand is **${target.cards.join(", ")}**!`
          );
          message.channel.send(
            `<@${player.id}> invoked the power of Switzerland to peek at <@${target.id}>'s country and hand!`
          );
          backup[message.channel.id].push({
            state: deepCopier(games[message.channel.id]),
            action: "switzerland",
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
    return message.channel.send("No game to be America in.");
  }
}

module.exports = {
  name: "switzerland",
  aliases: ["sw", "swiss"],
  execute,
};
