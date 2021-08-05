const { games, backup, defaultDeck } = require("../models");
const _ = require("underscore");

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
    if (player) {
      let card = capFirstLetter(args([0]));
      if (["Bounty", "Hunter"].includes(capFirstLetter(args[0]))) {
        card = "Bounty Hunter";
      } else if (["Sentry", "Guard"].includes(capFirstLetter(args[0]))) {
        card = "Sentry Guard";
      }
      if (
        player.revealed === "Japan" &&
        args.length > 0 &&
        defaultDeck.includes(card)
      ) {
        const idx = games[message.channel.id].deck.indexOf(card);
        if (idx === -1) {
          message.channel.send("Card not found in deck.");
        } else {
          const newcard = games[message.channel.id].deck.splice(idx, 1);
          player.cards.push(newcard);
          message.channel.send(`${newcard} found in deck!`);
          person.send(
            `You drew a ${newcard}.\nYour hand is now: ${player.cards.join(
              ", "
            )}.`
          );
        }
        games[message.channel.id].deck = _.shuffle(
          games[message.channel.id].deck
        );
        return message.channel.send("Deck shuffled.");
      } else {
        return message.channel.send("Invalid parameters.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to search for a card in in.");
  }
}

module.exports = {
  name: "search",
  aliases: ["js"],
  execute,
};
