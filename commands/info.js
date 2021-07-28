const Discord = require("discord.js");
const { PREFIX } = require("../env");

function execute(message, args, user) {
  const embed = new Discord.MessageEmbed().setTitle("Commands").addFields(
    {
      name: `${PREFIX}newgame`,
      value: "Start a new game",
    },
    {
      name: `${PREFIX}setplayer {@player}`,
      value: "Add a player to the game",
    },
    {
      name: `${PREFIX}setcountries {countries}`,
      value: "Set and assign countries to the players",
    },
    {
      name: `${PREFIX}startinghand`,
      value: "Draw three cards from the deck.",
    },
    {
      name: `${PREFIX}status`,
      value: "Show the current game status",
    },
    {
      name: `${PREFIX}endgame`,
      value: "End the game",
    },
    {
      name: `${PREFIX}info|help`,
      value: "Show this help message",
    }
  );
  message.channel.send(embed);
}

module.exports = {
  name: "info",
  aliases: ["help"],
  execute,
};
