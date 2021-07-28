const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let playerid = args[0];
    if (isNaN(playerid) || isNaN(parseFloat(playerid))) {
      // Assume it's a mention
      playerid = playerid.substr(3, playerid.length - 4);
    }
    games[message.channel.id].players.push({
      country: "",
      id: playerid,
      user: message.mentions.members.first(),
      cards: [],
      tokens: 2,
    });
  } else {
    return message.channel.send("No game to add player to.");
  }
}

module.exports = {
  name: "setplayer",
  aliases: [],
  execute,
};
