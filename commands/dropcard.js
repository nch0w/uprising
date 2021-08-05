const { games, backup } = require("../models");

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
    let card = capFirstLetter(args[0]);
    if (["bounty", "hunter"].includes(args[0].toLowerCase())) {
      card = "Bounty Hunter";
    } else if (["sentry", "guard"].includes(args[0].toLowerCase())) {
      card = "Sentry Guard";
    }
    if (player) {
      if (args.length > 0 && player.cards.includes(card)) {
        idx = player.cards.indexOf(card);
        player.dropped.push(player.cards.splice(idx, 1));
        if (player.specialcards.length > 0) {
          person.send(
            `Your hand is now: ${player.cards.join(
              ", "
            )}\nThe card on your Country Card is ${player.specialcards}`
          );
        } else {
          person.send(`Your hand is now: ${player.cards.join(", ")}`);
        }
        return message.channel.send(
          `<@${person.id}> has dropped a **${card}**.`
        );
      } else {
        return message.channel.send("Incorrect parameters.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to drop cards from.");
  }
}

module.exports = {
  name: "dropcard",
  aliases: ["dc", "drop"],
  execute,
};
