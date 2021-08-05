function execute(message, args, user) {
  return message.author.send(
    "**Instruction Manual:**\nhttps://docs.google.com/document/d/1pgAskAYr7lCJuh5vZ2LTCrYJdNGi9MADDtE4pi3Hk4M"
  );
}

module.exports = {
  name: "instructions",
  aliases: ["im", "instructionmanual", "manual"],
  execute,
};
