const { games, backup } = require("../models");

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
      let skSlots = 1;
      if (games[message.channel.id].revealed.asians > 3) {
        skSlots = 2;
      }
      if (
        args.length > 0 &&
        games[message.channel.id].trade.counter < skSlots &&
        ["Russia", "China", "ROK", "Japan", "India"].includes(
          player.revealed
        ) &&
        ((parseInt(args[0]) > 0 && parseInt(args[0]) <= player.cards.length) ||
          (player.specialcards.length > 0 && args[0].toLowerCase() === "cc"))
      ) {
        if (games[message.channel.id].trade.card.length > 0) {
          let cardone = games[message.channel.id].trade.card.pop();
          let cardtwo;
          if (parseInt(args[0])) {
            cardtwo = player.cards.splice(parseInt(args[0]) - 1, 1);
            player.cards.push(cardone);
          } else {
            cardtwo = player.specialcards.pop();
            player.specialcards.push(cardone);
          }
          if (games[message.channel.id].trade.source === "hand") {
            games[message.channel.id].trade.trader.cards.push(cardtwo);
          } else {
            games[message.channel.id].trade.trader.specialcards.push(cardtwo);
          }
          player.tokens = player.tokens + 1;
          games[message.channel.id].trade.trader.tokens =
            games[message.channel.id].trade.trader.tokens + 1;
          games[message.channel.id].trade.counter =
            games[message.channel.id].trade.counter + 1;
          person.send(`You have traded a ${cardtwo} for a ${cardone}.`);
          if (player.specialcards.length > 0) {
            person.send(
              `Your hand is now: ${player.cards.join(
                ", "
              )}\nThe card on your Country Card is ${player.specialcards}`
            );
          } else {
            person.send(`Your hand is now: ${player.cards.join(", ")}`);
          }
          games[message.channel.id].trade.trader.user.send(
            `You have traded a ${cardone} for a ${cardtwo}.`
          );
          if (games[message.channel.id].trade.trader.specialcards.length > 0) {
            games[message.channel.id].trade.trader.user.send(
              `Your hand is now: ${player.cards.join(
                ", "
              )}\nThe card on your Country Card is ${player.specialcards}`
            );
          } else {
            games[message.channel.id].trade.trader.user.send(
              `Your hand is now: ${player.cards.join(", ")}`
            );
          }
          return message.channel.send(
            `The card trade between <@${
              games[message.channel.id].trade.trader.id
            }> and <@${
              player.id
            }> is complete!\nThey each gained **1 token** and now have ${
              games[message.channel.id].trade.trader.tokens
            } and ${player.tokens}.`
          );
        } else {
          let card;
          if (parseInt(args[0])) {
            card = player.cards.splice(parseInt(args[0]) - 1, 1);
            games[message.channel.id].trade.source = "hand";
          } else {
            card = player.specialcards.pop();
            games[message.channel.id].trade.source = "Country Card";
          }
          games[message.channel.id].trade.card.push(card);
          games[message.channel.id].trade.trader = player;
          return message.channel.send(
            `<@${player.id}> offered a card from their ${
              games[message.channel.id].trade.source
            } for trade with another revealed Asian country.`
          );
        }
      } else {
        return message.channel.send("Invalid parameters.");
      }
    } else {
      return message.channel.send("User not a player in game.");
    }
  } else {
    return message.channel.send("No game to trade a card in.");
  }
}

module.exports = {
  name: "trade",
  aliases: ["t", "rok", "southkorea"],
  execute,
};
