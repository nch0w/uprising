const { games, cardInfo } = require("../models");

function execute(message, args, user) {
  let card = args[0];
  if (["Bounty", "Hunter"].includes(args[0])) {
    card = "Bounty Hunter";
  } else if (["Sentry", "Guard"].includes(args[0])) {
    card = "Sentry Guard";
  }
  if (args.length > 0 && cardInfo[card]) {
    message.author.send(cardInfo[card]);
  } else {
    message.author.send("Invalid parameters.");
  }
}

module.exports = {
  name: "cardinfo",
  aliases: ["ci"],
  execute,
};
