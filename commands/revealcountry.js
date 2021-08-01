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
      if (player.revealed === "?") {
        if (player.countrytokens === 0) {
          player.revealed = player.country;
          return message.channel.send(
            `<@${player.id}> revealed themselves as **${player.country}**!`
          );
        } else {
          return message.channel.send(
            `<@${player.id}> is blocked from revealing their country.`
          );
        }
      } else {
        return message.channel.send(
          `<@${player.id}> has already revealed their country. ~~But if you forgot it, it was ${player.country}.~~`
        );
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to reveal a country in.");
  }
}

module.exports = {
  name: "revealcountry",
  aliases: ["rcountry", "reveal"],
  execute,
};
