const { games, backup } = require("../models");

function execute(message, args, user) {
  backup[message.channel.id] = JSON.parse(
    JSON.stringify(games[message.channel.id])
  );
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
        let xferLimit =
          games[message.channel.id].players.filter(
            (p) =>
              ["USA", "UK", "Germany", "Italy"].includes(p.revealed) &&
              p.cards.length > 0
          ).length * 2;
        if (
          args.length > 1 &&
          parseInt(args[0]) > 0 &&
          parseInt(args[0]) <= xferLimit - games[message.channel.id].france &&
          ["USA", "UK", "Germany", "France", "Italy"].includes(
            player.revealed
          ) &&
          ["USA", "UK", "Germany", "France", "Italy"].includes(target.revealed)
        ) {
          if (player.tokens >= parseInt(args[0])) {
            player.tokens = player.tokens - parseInt(args[0]);
            target.tokens = target.tokens + parseInt(args[0]);
            games[message.channel.id].france =
              games[message.channel.id].france + parseInt(args[0]);
            return message.channel.send(
              `<@${player.id}> transferred **${args[0]} tokens** to <@${target.id}>! They now have **${player.tokens}** and **${target.tokens}** respectively.`
            );
          } else {
            return message.channel.send(
              `<@${target.id}> has insufficient funds.`
            );
          }
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
    return message.channel.send("No game to do an France transfer in.");
  }
}

module.exports = {
  name: "france",
  aliases: ["fr", "transfer"],
  execute,
};
