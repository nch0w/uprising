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
      if (args.length > 0 && "cc" === args[0].toLowerCase()) {
        if (["Russia", "ROK"].includes(player.revealed)) {
          const newcard = games[message.channel.id].deck.shift();
          player.specialcards.push(newcard);
          person.send(
            `You drew a ${newcard} and placed it on your Country Card.\nYour hand is: ${player.cards.join(
              ", "
            )}`
          );
          return message.channel.send(
            `<@${player.id}> drew a card and placed it on their Country Card!`
          );
        } else {
          return message.channel.send(
            `<@${player.id} not allowed to draw to Country Card.`
          );
        }
      } else {
        const newcard = games[message.channel.id].deck.shift();
        player.cards.push(newcard);
        if (player.specialcards.length > 0) {
          person.send(
            `You drew a ${newcard}.\nYour hand is now: ${player.cards.join(
              ", "
            )}\nThe card on your Country Card is ${player.specialcards}`
          );
        } else {
          person.send(
            `You drew a ${newcard}.\nYour hand is now: ${player.cards.join(
              ", "
            )}`
          );
        }
        return message.channel.send(`<@${player.id}> drew a card!`);
      }
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
