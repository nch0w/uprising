const { games, backup } = require("../models");
const { deepCopier } = require("../helpers");

function execute(message, args, user) {
  if (message.channel.id in games) {
    let person = message.author;
    if (message.mentions.members.first()) {
      person = message.mentions.members.first().user;
    }
    if (
      games[message.channel.id].players.filter((p) => p.id === person.id)
        .length === 0
    ) {
      games[message.channel.id].players.push({
        country: "",
        revealed: "?",
        id: person.id,
        user: person,
        cards: [],
        specialcards: [],
        dropped: [],
        tokens: 2,
        countrytokens: 0,
        counters: 0,
        entre: { status: "", count: 0 },
        indicator: "",
        death: "",
      });
      message.channel.send(`<@${person.id}> added to game!`);
      backup[message.channel.id].push({
        state: deepCopier(games[message.channel.id]),
        action: "setplayer",
        user: person,
      });
    } else {
      return message.channel.send(`<@${person.id}> is already in the game.`);
    }
  } else {
    return message.channel.send("No game to add player to.");
  }
}

module.exports = {
  name: "setplayer",
  aliases: ["join"],
  execute,
};
