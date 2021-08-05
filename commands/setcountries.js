const { games, countryDeck } = require("../models");
const _ = require("underscore");

function capFirstLetterCountries(string) {
  if (["usa", "rok", "dprk", "uk"].includes(string.toLowerCase())) {
    return string.toUpperCase();
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (
      args.length === games[message.channel.id].players.length &&
      args.every((elem) => countryDeck.includes(capFirstLetterCountries(elem)))
    ) {
      var shuffledCountries = _.shuffle(args);
      for (let i = 0; i < args.length; i++) {
        games[message.channel.id].players[i].country = capFirstLetterCountries(
          shuffledCountries[i]
        );
        games[message.channel.id].players[i].user.send(
          `Your country is ${capFirstLetterCountries(shuffledCountries[i])}.`
        );
      }
      games[message.channel.id].players = _.shuffle(
        games[message.channel.id].players
      );
      return message.channel.send("Countries set!");
    } else {
      return message.channel.send("Invalid parameters.");
    }
  } else {
    return message.channel.send("No game to set countries for.");
  }
}

module.exports = {
  name: "setcountries",
  aliases: ["sc"],
  execute,
};
