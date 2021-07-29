const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    if (
      games[message.channel.id].players.filter((p) => p.id === person.id)
        .length === 0
    ) {
      games[message.channel.id].players.push({
        country: "",
        revealed: "Unknown",
        id: person.id,
        user: person,
        cards: [],
        dropped: [],
        tokens: 2,
      });
      return message.channel.send(`<@${person.id}> added to game!`);
    } else {
      return message.channel.send(`<@${person.id}> is already in the game.`);
    }
  } else {
    return message.channel.send("No game to add player to.");
  }
}

module.exports = {
  name: "setplayer",
  aliases: ["join"],
  execute,
};
