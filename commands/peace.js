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
      const newcards = games[message.channel.id].deck.splice(0, 2);
      player.cards.push(newcards[0], newcards[1]);
      person.send(
        `You drew ${newcards.join(
          ", "
        )}.\nYour hand is now: ${player.cards.join(", ")}.`
      );
      return message.channel.send(
        `<@${player.id}> claimed Peacekeeper to draw two cards! (They must return two cards now.)`
      );
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to keep the peace in.");
  }
}

module.exports = {
  name: "peace",
  aliases: [],
  execute,
};
