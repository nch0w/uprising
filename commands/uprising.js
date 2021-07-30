const { games } = require("../models");

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
        if (player.tokens > 7) {
          player.tokens = player.tokens - 8;
          return message.channel.send(
            `<@${player.id}> paid **8 tokens** to start an **Uprising** against <@${target.id}>, who must now drop a card!\nThey now have **${player.tokens}**.`
          );
        } else {
          return message.channel.send("Insufficient funds.");
        }
      } else {
        return message.channel.send("User or target not a player in game.");
      }
    } else {
      return message.channel.send("No target.");
    }
  } else {
    return message.channel.send("No game to do an uprising in.");
  }
}

module.exports = {
  name: "uprising",
  aliases: ["u", "ur"],
  execute,
};
