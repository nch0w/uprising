const { games, cardInfo } = require("../models");

function execute(message, args, user) {
  let card = args[0];
  if (["Bounty", "Hunter"].includes(args[0])) {
    card = "Bounty Hunter";
  } else if (["Sentry", "Guard"].includes(args[0])) {
    card = "Sentry Guard";
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
