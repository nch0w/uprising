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
    let card = args[0];
    if (["Bounty", "Hunter"].includes(args[0])) {
      card = "Bounty Hunter";
    } else if (["Sentry", "Guard"].includes(args[0])) {
      card = "Sentry Guard";
    }
    if (player) {
      if (args.length > 0 && player.cards.includes(card)) {
        idx = player.cards.indexOf(card);
        player.dropped.push(player.cards.splice(idx, 1));
        return message.channel.send(`<@${person.id}> has dropped **${card}**.`);
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
  aliases: [],
  execute,
};
