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
      if (games[message.channel.id].activist < 4) {
        games[message.channel.id].activist =
          games[message.channel.id].activist + 1;
        return message.channel.send(
          `<@${player.id}> claimed Activist and now recieves a free action.`
        );
      } else {
        return message.channel.send(
          "There have already been four Activist claims this round."
        );
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to claim Activist in.");
  }
}

module.exports = {
  name: "activist",
  aliases: ["a"],
  execute,
};
