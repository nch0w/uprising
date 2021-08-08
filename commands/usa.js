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
        let peekLimit = Math.min(
          games[message.channel.id].players.filter((p) =>
            ["USA", "UK", "Germany", "France", "Italy"].includes(p.country)
          ).length - 2,
          2
        );
        if (
          player.revealed === "USA" &&
          games[message.channel.id].usa < peekLimit
        ) {
          games[message.channel.id].usa = games[message.channel.id].usa + 1;
          person.send(
            `<@${target.id}>'s country is **${target.country}**! You have ${
              peekLimit - games[message.channel.id].usa
            } peeks left.`
          );
          message.channel.send(
            `<@${player.id}> invoked the power of America to peek at <@${
              target.id
            }>'s country! They have ${
              peekLimit - games[message.channel.id].usa
            } peeks left.`
          );
          backup[message.channel.id].push({
            state: deepCopier(games[message.channel.id]),
            action: "usa",
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
  name: "usa",
  aliases: ["us", "america", "peek"],
  execute,
};
