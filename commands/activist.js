const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    console.log(person);
    console.log(games[message.channel.id].players);
    const player = games[message.channel.id].players.find(
      (element) => element.user === person
    );
    if (player) {
      if (games[message.channel.id].activist < 4) {
        games[message.channel.id].activist =
          games[message.channel.id].activist + 1;
        message.channel.send(
          `<@${player.id}> claimed Activist and now recieves a free action.`
        );
        backup[message.channel.id].push({
          state: deepCopier(games[message.channel.id]),
          action: "activist",
          user: person,
        });
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
