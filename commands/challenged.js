const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
      if (args.length > 0) {
        let card = capFirstLetter(args[0]);
        if (["Bounty", "Hunter"].includes(capFirstLetter(args[0]))) {
          card = "Bounty Hunter";
        } else if (["Sentry", "Guard"].includes(capFirstLetter(args[0]))) {
          card = "Sentry Guard";
        }
        let idx = player.cards.indexOf(card);
        if (idx === -1) {
          return message.channel.send("Invalid card name.");
        } else {
          games[message.channel.id].deck.push(player.cards.splice(idx, 1));
          const newcard = games[message.channel.id].deck.shift();
          player.cards.push(newcard);
          message.channel.send(
            `<@${person.id}> reveals that they possess a **${card}**! They return this card and draw a new one.`
          );
        }
        if (player.specialcards.length > 0) {
          person.send(
            `Your hand is now: ${player.cards.join(
              ", "
            )}\nThe card on your Country Card is ${player.specialcards}`
          );
        } else {
          person.send(`Your hand is now: ${player.cards.join(", ")}`);
        }
        backup[message.channel.id].push({
          state: deepCopier(games[message.channel.id]),
          action: "challenged",
          user: person,
        });
      } else {
        return message.channel.send("Incorrect parameters.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to win a challenge in.");
  }
}

module.exports = {
  name: "challenged",
  aliases: ["ch"],
  execute,
};
