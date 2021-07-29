const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
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
    return message.channel.send("No game to add player to.");
  }
}

module.exports = {
  name: "setplayer",
  aliases: [],
  execute,
};
