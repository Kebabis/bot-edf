const { Client, Intents, MessageEmbed, Message } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "REACTION", "USER"],
});
const { apostas } = require("./comandos/apostas");
const { token } = require("./config.json");
client.once("ready", () => {
  console.log("Pai ta on 😎");
});

client.on("messageCreate", async (mensagem) => {
  if (mensagem.content.startsWith("!apostar")) {
    const separado = mensagem.content.split(" ");
  }
});

client.login(token);
