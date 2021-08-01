const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (
      games[message.channel.id].turn === 0 &&
      games[message.channel.id].players[0].indicator === ""
    ) {
      games[message.channel.id].players[0].indicator = "• ";
      return message.channel.send(
        `The game of Uprising begins with <@${
          games[message.channel.id].players[0].id
        }>'s turn!`
      );
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

    games[message.channel.id].turn = games[message.channel.id].turn + 1;
    if (
      games[message.channel.id].turn ===
      games[message.channel.id].players.length
    ) {
      games[message.channel.id].turn = 0;
      games[message.channel.id].activist = 0;
    }
    games[message.channel.id].players[
      games[message.channel.id].turn
    ].indicator = "• ";
    return message.channel.send(
      `<@${
        games[message.channel.id].players[games[message.channel.id].turn].id
      }>'s turn!`
    );
  } else {
    return message.channel.send("No game to progress to the next turn in.");
  }
}

module.exports = {
  name: "nextturn",
  aliases: ["nt"],
  execute,
};
