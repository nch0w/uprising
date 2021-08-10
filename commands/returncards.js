const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function execute(message, args, user) {
  if (message.guild !== null) {
    message.delete();
  }

  let channel = message.channel.id;
  if (!(message.channel.id in games)) {
    for (let id in games) {
      if (games[id].players.map((p) => p.user).includes(message.author)) {
        channel = id;
        break;
      }
    }
  }

  if (channel in games) {
    let person = message.author;
    if (message.mentions.users.first()) {
      person = message.mentions.users.first();
    }
    const player = games[channel].players.find(
      (element) => element.user === person
    );
    if (player) {
      if (args.length > 0) {
        let lastarg = "none";
        let returned = 0;
        for (
          i = 0;
          i < args.length - message.mentions.users.array().length;
          i++
        ) {
          if (
            (lastarg === "Bounty" && capFirstLetter(args[i]) === "Hunter") ||
            (lastarg === "Sentry" && capFirstLetter(args[i]) === "Guard")
          ) {
            lastarg = "none";
          } else {
            let card = capFirstLetter(args[i]);
            if (["Bounty", "Hunter"].includes(capFirstLetter(args[i]))) {
              card = "Bounty Hunter";
            } else if (["Sentry", "Guard"].includes(capFirstLetter(args[i]))) {
              card = "Sentry Guard";
            }
            let idx = player.cards.indexOf(card);
            if (idx === -1) {
              message.channel.send("Invalid card name.");
            } else {
              games[channel].deck.push(player.cards.splice(idx, 1)[0]);
              person.send(`You have returned a ${card}.`);
              message.channel.send(`<@${person.id}> has returned a card.`);
              returned = returned + 1;
            }
            lastarg = args[i];
          }
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
        if (returned > 0) {
          backup[channel].push({
            state: deepCopier(games[channel]),
            action: "returncards",
            user: person,
          });
        }
      } else {
        return message.channel.send("Incorrect parameters.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to return cards in.");
  }
}

module.exports = {
  name: "returncards",
  aliases: ["rc", "return"],
  execute,
};
