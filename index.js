const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const { PREFIX, DISCORD_TOKEN, OWNER } = require("./env");

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  client.user.setActivity(`${PREFIX}info`, { type: "WATCHING" });
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  const user = {
    isOwner: message.author.id === OWNER,
  };
  if (command) {
    try {
      await command.execute(message, args, user);
    } catch (error) {
      console.error(error);
      message.channel.send(
        `There was an error trying to execute \`${commandName}\`.`
      );
    }
  } else {
    message.channel.send(
      `Unknown command: "${commandName}". Please use \`${PREFIX}info\` to find a list of commands.`
    );
  }
});

client.login(DISCORD_TOKEN);
