const { games } = require("../models");

function execute(message, args, user) {
  return message.author.send(
    "**Player Aid:**\nhttps://docs.google.com/document/d/1dL2wpp9nP7HUoAc18o1-2kB-AHncAJiLGSMZgM25rF4/edit?usp=sharing"
  );
}

module.exports = {
  name: "playeraid",
  aliases: ["pa", "aid"],
  execute,
};
