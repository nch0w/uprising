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
      if (player.revealed === "?") {
        if (player.countrytokens === 0) {
          if (
            ["USA", "UK", "Germany", "France", "Italy"].includes(player.country)
          ) {
            games[message.channel.id].revealed.europeans =
              games[message.channel.id].revealed.europeans + 1;
          } else if (
            ["China", "Russia", "ROK", "Japan", "India"].includes(
              player.country
            )
          ) {
            games[message.channel.id].revealed.asians =
              games[message.channel.id].revealed.asians + 1;
          } else {
            games[message.channel.id].revealed.neutrals =
              games[message.channel.id].revealed.neutrals + 1;
          }
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
