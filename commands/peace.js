const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

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
      const newcards = games[message.channel.id].deck.splice(0, 2);
      player.cards.push(newcards[0], newcards[1]);
      person.send(`You drew ${newcards.join(", ")}.`);
      if (player.specialcards.length > 0) {
        person.send(
          `Your hand is now: ${player.cards.join(
            ", "
          )}\nThe card on your Country Card is ${player.specialcards}`
        );
      } else {
        person.send(`Your hand is now: ${player.cards.join(", ")}`);
      }
      message.channel.send(
        `<@${player.id}> claimed Peacekeeper to draw two cards! (They must return two cards now.)`
      );
      backup[message.channel.id].push({
        state: deepCopier(games[message.channel.id]),
        action: "peace",
        user: person,
      });
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to keep the peace in.");
  }
}

module.exports = {
  name: "peace",
  aliases: ["p"],
  execute,
};
