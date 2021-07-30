const Discord = require("discord.js");
const { PREFIX } = require("../env");

function execute(message, args, user) {
  const embed = new Discord.MessageEmbed().setTitle("Commands").addFields(
    {
      name: `${PREFIX}newgame|ng`,
      value: "Start a new game",
    },
    {
      name: `${PREFIX}setplayer|join`,
      value: "Add a player to the game",
    },
    {
      name: `${PREFIX}setcountries|sc {countries}`,
      value: "Set and assign countries to the players",
    },
    {
      name: `${PREFIX}startinghand|sh`,
      value: "Draw three cards from the deck",
    },
    {
      name: `${PREFIX}nextturn|nt`,
      value: "Move to the next player's turn",
    },
    {
      name: `${PREFIX}status`,
      value: "Show the current game status",
    },
    {
      name: `${PREFIX}endgame|eg`,
      value: "End the game",
    },
    {
      name: `${PREFIX}addtokens|at {number}`,
      value: "Add (or remove) tokens from player",
    },
    {
      name: `${PREFIX}draw|d`,
      value: "Draw a card from the deck",
    },
    {
      name: `${PREFIX}dropcard|dc`,
      value: "Drop a killed card",
    },
    {
      name: `${PREFIX}returncards|rc {cards}`,
      value: "Return cards to the bottom of the deck",
    },
    {
      name: `${PREFIX}revealcards`,
      value: "Reveal the rest of the cards in the deck",
    },
    {
      name: `${PREFIX}revealcountry`,
      value: "Reveal the player's country",
    },
    {
      name: `${PREFIX}shuffle`,
      value: "Shuffle the deck",
    },
    {
      name: `${PREFIX}steal {number} {@target}`,
      value: "Steal a number of tokens from an opponent",
    },
    {
      name: `${PREFIX}takeholding|th {number}`,
      value: "Take (or give) tokens from the Holding Area",
    },
    {
      name: `${PREFIX}income|i`,
      value: "Use Income action",
    },
    {
      name: `${PREFIX}funding|f`,
      value: "Use Funding action",
    },
    {
      name: `${PREFIX}stockpile|sp`,
      value: "Use Stockpile action",
    },
    {
      name: `${PREFIX}uprising|u {@target}`,
      value: "Start an Uprising against an opponent",
    },
    {
      name: `${PREFIX}peace|p`,
      value: "Use Peacekeeper's Ability #1",
    },
    {
      name: `${PREFIX}search|js {card}`,
      value: "Search the deck for a card (Japan only)",
    },
    {
      name: `${PREFIX}cardinfo|ci {card|country}`,
      value: "Get info on a card or country",
    },
    {
      name: `${PREFIX}instructions|im`,
      value: "Get link to Instruction Manual",
    },
    {
      name: `${PREFIX}playeraid|pa`,
      value: "Get link to Player Aid",
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
