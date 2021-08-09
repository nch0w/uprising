const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (message.mentions.members.first()) {
      let person = message.author;
      let targetperson = message.mentions.members.first().user;
      if (
        message.mentions.members.first().user !==
        message.mentions.members.last().user
      ) {
        person = message.mentions.members.first().user;
        targetperson = message.mentions.members.last().user;
      }
      const player = games[message.channel.id].players.find(
        (element) => element.user === person
      );
      const target = games[message.channel.id].players.find(
        (element) => element.user === targetperson
      );
      if (player && target) {
        let card = capFirstLetter(args[0]);
        if (["bounty", "hunter"].includes(args[0].toLowerCase())) {
          card = "Bounty Hunter";
        } else if (["sentry", "guard"].includes(args[0].toLowerCase())) {
          card = "Sentry Guard";
        }
        if (player.tokens > 1 && player.cards.includes(card)) {
          player.tokens = player.tokens - 2;
          let idx = player.cards.indexOf(card);
          droppedCard = target.dropped.pop();
          player.cards.push(droppedCard);
          target.dropped.push(player.cards.splice(idx, 1));
          message.channel.send(
            `<@${player.id}> claimed Medic and paid **2 tokens** to take <@${target.id}>'s dropped **${droppedCard}**, replacing it with a **${card}** from their hand.\nThey now have **${player.tokens}**.`
          );
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
            action: "medic",
            user: person,
          });
        } else {
          return message.channel.send("Invalid parameters.");
        }
      } else {
        return message.channel.send("User or target not a player in game.");
      }
    } else {
      return message.channel.send("No target.");
    }
  } else {
    return message.channel.send("No game to do medical operations in.");
  }
}

module.exports = {
  name: "medic",
  aliases: ["md"],
  execute,
};
