const { Client, Intents, MessageEmbed, Message } = require("discord.js");
const aleatorio = require("./comandos/apostas");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "REACTION", "USER"],
});
const { token } = require("./config.json");
client.once("ready", () => {
  console.log("Pai ta on 😎");
  var db = new JsonDB(new Config("usuarios", true, false, "/"));

  db.push("/teste", 3);
});

client.on("messageCreate", async (mensagem) => {
  if (mensagem.content.startsWith("!apostar")) {
    const separado = mensagem.content.split(" ");
    const resul = aleatorio();
    if (resul === true) {
      console.log("ganhou");
    } else {
      console.log("perdeu");
    }
  }
});

client.login(token);
