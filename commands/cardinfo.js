const { games, cardInfo } = require("../models");

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function execute(message, args, user) {
  let card = capFirstLetter(args[0]);
  if (["Bounty", "Hunter"].includes(capFirstLetter(args[0]))) {
    card = "Bounty Hunter";
  } else if (["Sentry", "Guard"].includes(capFirstLetter(args[0]))) {
    card = "Sentry Guard";
  } else if (["Usa", "Rok", "Dprk", "Uk"].includes(capFirstLetter(args[0]))) {
    card = args[0].toUpperCase();
  }
  if (args.length > 0 && cardInfo[card]) {
    return message.channel.send(cardInfo[card]);
  } else {
    return message.channel.send("Invalid parameters.");
  }
}

module.exports = {
  name: "cardinfo",
  aliases: ["ci"],
  execute,
};
