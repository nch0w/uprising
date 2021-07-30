const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    const player = games[message.channel.id].players.find(
      (element) => element.user === person
    );
    if (player) {
      let amount = games[message.channel.id].holding;
      player.tokens = player.tokens + amount;
      games[message.channel.id].holding = 0;
      return message.channel.send(
        `<@${player.id}> Stockpiled **${amount} token(s)** from the Holding Area and now has **${player.tokens}**.`
      );
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to stockpile in.");
  }
}

module.exports = {
  name: "stockpile",
  aliases: ["sp"],
  execute,
};
