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
      const newcard = games[message.channel.id].deck.shift();
      player.cards.push(newcard);
      person.send(
        `You drew a ${newcard}.\nYour hand is now: ${player.cards.join(", ")}.`
      );
      return message.channel.send(`<@${player.id}> drew a card!`);
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to draw a card in.");
  }
}

module.exports = {
  name: "draw",
  aliases: ["d"],
  execute,
};
