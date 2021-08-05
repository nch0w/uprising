const { games, backup } = require("../models");

function execute(message, args, user) {
  backup[message.channel.id] = JSON.parse(
    JSON.stringify(games[message.channel.id])
  );
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    const player = games[message.channel.id].players.find(
      (element) => element.user === person
    );
    if (player) {
      player.tokens = player.tokens + 5;
      games[message.channel.id].holding = games[message.channel.id].holding + 1;
      player.entre = { status: "(Entrepreneured)", count: 1 };
      return message.channel.send(
        `<@${player.id}> claimed Entrepreneur and recieved **5 tokens**, placing **1 token** into the Holding Area at the same time!\nThey now have **${player.tokens}**.`
      );
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to claim Entrepreneur in.");
  }
}

module.exports = {
  name: "entrepreneur",
  aliases: ["entre", "e"],
  execute,
};
