const { games } = require("../models");

function execute(message, args, user) {
  message.delete();
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
        let lastarg = "none";
        for (i = 0; i < args.length; i++) {
          if (
            (lastarg === "Bounty" && args[i] === "Hunter") ||
            (lastarg === "Sentry" && args[i] === "Guard")
          ) {
            lastarg = "none";
          } else {
            let card = args[i];
            if (["Bounty", "Hunter"].includes(args[i])) {
              card = "Bounty Hunter";
            } else if (["Sentry", "Guard"].includes(args[i])) {
              card = "Sentry Guard";
            }
            let idx = player.cards.indexOf(card);
            if (idx === -1) {
              message.channel.send("Invalid card name.");
            } else {
              games[message.channel.id].deck.push(player.cards.splice(idx, 1));
              person.send(`You have returned a ${card}.`);
              message.channel.send(`<@${person.id}> has returned a card.`);
            }
            lastarg = args[i];
          }
        }
        return person.send(`Your hand is now: ${player.cards.join(", ")}`);
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
