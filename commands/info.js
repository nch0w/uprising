const Discord = require("discord.js");
const { PREFIX } = require("../env");

function execute(message, args, user) {
  const setup = new Discord.MessageEmbed().setTitle("Setup Commands").addFields(
    {
      name: `${PREFIX}newgame|ng {@mods}`,
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
      name: `${PREFIX}gamestate|gs`,
      value: "Show the current full gamestate (Mods only)",
    },
    {
      name: `${PREFIX}backup|bu`,
      value: "Show the history of actions taken",
    },
    {
      name: `${PREFIX}endgame|eg`,
      value: "End the game",
    }
  );
  const general = new Discord.MessageEmbed()
    .setTitle("General/Universal Commands")
    .addFields(
      {
        name: `${PREFIX}addcounters|ac {number}`,
        value: "Add (or remove) counters from player",
      },
      {
        name: `${PREFIX}addtokens|at {number}`,
        value: "Add (or remove) tokens from player",
      },
      {
        name: `${PREFIX}challenged|ch {card}`,
        value: "Reveal a card to win a challenge",
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
        value: "Return cards to the bottom of the deck (works in DMs)",
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
        name: `${PREFIX}undo`,
        value: "Undo the effects of the last command made",
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
      }
    );
  const specific = new Discord.MessageEmbed()
    .setTitle("Card/Country Commands")
    .addFields(
      {
        name: `${PREFIX}activist|a`,
        value: "Use Activist's Ability #1",
      },
      {
        name: `${PREFIX}commissar1|cm1`,
        value: "Use Commissar's Ability #1",
      },
      {
        name: `${PREFIX}commissar2|cm2 {@target} {@target}`,
        value: "Use Commissar's Ability #2",
      },
      {
        name: `${PREFIX}diplomat|dm {number} {@target}`,
        value: "Use Diplomat's Ability #2",
      },
      {
        name: `${PREFIX}draw|d cc`,
        value:
          "Draw a card from the deck to your Country Card (Russia & ROK only)",
      },
      {
        name: `${PREFIX}entrepreneur|e`,
        value: "Use Entrepreneur's Ability #1",
      },
      {
        name: `${PREFIX}france|fr {number} {@target}`,
        value: "Use France's token transfer (Europe only)",
      },
      {
        name: `${PREFIX}medic|md {card} {@target}`,
        value: "Use Medic's Ability #2 (specify the card in your hand)",
      },
      {
        name: `${PREFIX}minister|m`,
        value: "Use Minister's Ability #1",
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
        name: `${PREFIX}switzerland|sw {@target}`,
        value: "Peek at another player's country and cards (Switzerland only)",
      },
      {
        name: `${PREFIX}trade|t {card number|cc}`,
        value: "Offer an ROK trade or complete an ROK trade (Asia only)",
      },
      {
        name: `${PREFIX}unblock|ub`,
        value: "Unblock the player's country card",
      },
      {
        name: `${PREFIX}usa|us {target}`,
        value: "Peek at another player's country (USA only)",
      }
    );
  const embed = new Discord.MessageEmbed().setTitle("Commands").addFields(
    {
      name: `${PREFIX}info setup`,
      value: "Get commands for game setup and progression",
    },
    {
      name: `${PREFIX}info general`,
      value: "Get commands for general game mechanics and Universal Actions",
    },
    {
      name: `${PREFIX}info specific`,
      value: "Get commands for card-specific and country-specific actions",
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
  if (args.length > 0 && args[0] === "setup") {
    message.channel.send(setup);
  } else if (args.length > 0 && args[0] === "general") {
    message.channel.send(general);
  } else if (args.length > 0 && args[0] === "specific") {
    message.channel.send(specific);
  } else {
    message.channel.send(embed);
  }
}

module.exports = {
  name: "info",
  aliases: ["help"],
  execute,
};
