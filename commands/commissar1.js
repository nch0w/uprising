const { games, backup } = require("../models");
const _ = require("underscore");
const { deepCopier } = require("../helpers");

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
        if (
          (["USA", "UK", "Germany", "Italy", "France"].includes(
            player.revealed
          ) &&
            ["USA", "UK", "Germany", "Italy", "France"].includes(
              target.revealed
            )) ||
          (["China", "ROK", "Japan", "India", "Russia"].includes(
            player.revealed
          ) &&
            ["China", "ROK", "Japan", "India", "Russia"].includes(
              target.revealed
            ) &&
            target.cards.length > 1)
        ) {
          let peeks = _.shuffle(target.cards).slice(0, 2);
          person.send(
            `You peeked at ${peeks[0]} and ${peeks[1]}. Let <@${target.id}> know if they should discard either of these.`
          );
          targetperson.send(
            `${player.id} peeked at your ${peeks[0]} and ${peeks[1]}.`
          );
          message.channel.send(
            `<@${player.id}> claimed Commissar to peek at two of <@${target.id}>'s cards. <@${target.id}> must now discard and replace cards as <@${player.id}> sees fit.`
          );
        } else {
          let peeks = _.shuffle(target.cards).slice(0, 1);
          person.send(
            `You peeked at ${peeks[0]}. Let <@${target.id}> know if they should discard this.`
          );
          targetperson.send(`${player.id} peeked at your ${peeks[0]}.`);
          message.channel.send(
            `<@${player.id}> claimed Commissar to peek at one of <@${target.id}>'s cards. <@${target.id}> must now discard and replace this card if <@${player.id}> sees fit.`
          );
        }
        backup[message.channel.id].push({
          state: deepCopier(games[message.channel.id]),
          action: "commissar1",
          user: person,
        });
      } else {
        return message.channel.send("User or target not a player in game.");
      }
    } else {
      return message.channel.send("No target.");
    }
  } else {
    return message.channel.send("No game to uphold Communism in.");
  }
}

module.exports = {
  name: "commissar1",
  aliases: ["cm1"],
  execute,
};
