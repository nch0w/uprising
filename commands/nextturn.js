const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    console.log(games[message.channel.id]);
    if (
      games[message.channel.id].turn === 0 &&
      games[message.channel.id].players[0].indicator === ""
    ) {
      games[message.channel.id].players[0].indicator = "• ";
      backup[message.channel.id].push({
        state: deepCopier(games[message.channel.id]),
        action: "nextturn",
        user: message.author,
      });
      return message.channel.send(
        `The game of Uprising begins with <@${
          games[message.channel.id].players[0].id
        }>'s turn!`
      );
    }
    if (
      games[message.channel.id].players.filter((p) => p.cards.length !== 0)
        .length === 0
    ) {
      return message.channel.send("All players appear to be dead.");
    }
    games[message.channel.id].players[
      games[message.channel.id].turn
    ].indicator = "";
    if (
      games[message.channel.id].players[games[message.channel.id].turn].entre
        .count > 0
    ) {
      games[message.channel.id].players[
        games[message.channel.id].turn
      ].entre.count = 0;
    } else {
      games[message.channel.id].players[
        games[message.channel.id].turn
      ].entre.status = "";
    }
    if (
      games[message.channel.id].players[games[message.channel.id].turn].comm
        .count > 0
    ) {
      games[message.channel.id].players[
        games[message.channel.id].turn
      ].comm.count = 0;
    } else {
      games[message.channel.id].players[
        games[message.channel.id].turn
      ].comm.status = "";
    }
    games[message.channel.id].turn = games[message.channel.id].turn + 1;
    if (
      games[message.channel.id].turn ===
      games[message.channel.id].players.length
    ) {
      games[message.channel.id].turn = 0;
      games[message.channel.id].activist = 0;
      games[message.channel.id].france = 0;
      games[message.channel.id].trade.counter = 0;
    }
    while (
      games[message.channel.id].players[games[message.channel.id].turn].cards
        .length === 0
    ) {
      games[message.channel.id].turn = games[message.channel.id].turn + 1;
      if (
        games[message.channel.id].turn ===
        games[message.channel.id].players.length
      ) {
        games[message.channel.id].turn = 0;
        games[message.channel.id].activist = 0;
        games[message.channel.id].france = 0;
        games[message.channel.id].trade.counter = 0;
      }
    }
    games[message.channel.id].players[
      games[message.channel.id].turn
    ].indicator = "• ";
    message.channel.send(
      `<@${
        games[message.channel.id].players[games[message.channel.id].turn].id
      }>'s turn!`
    );
    backup[message.channel.id].push({
      state: deepCopier(games[message.channel.id]),
      action: "nextturn",
      user: message.author,
    });
  } else {
    return message.channel.send("No game to progress to the next turn in.");
  }
}

module.exports = {
  name: "nextturn",
  aliases: ["nt"],
  execute,
};
