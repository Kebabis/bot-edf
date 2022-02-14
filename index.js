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
const banco = require("./db/db");
const { token } = require("./config.json");
client.once("ready", () => {
  console.log("Pai ta on 😎");
});
var embed;
client.on("messageCreate", async (mensagem) => {
  if (mensagem.content.startsWith("!bal")) {
    const dados = banco.procurar(mensagem.author.id);
    if (dados === false) {
      embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor("#ed1212")
        .setDescription(
          `<@${mensagem.author.id}> Antes de usar comandos é necessario se registrar utilizando o comando !registrar`
        );
    } else {
      embed = new MessageEmbed()
        .setTitle("Banco")
        .setColor("#668099")
        .setDescription(
          `O saldo de <@${dados.id}> é de R$ ${dados.dinheiro},00`
        );
    }
    mensagem.channel.send({ embeds: [embed] });
  }
  if (mensagem.content.startsWith("!trabalhar")) {
    var ganhos = banco.dinheiros(true, mensagem.author.id);
    if (ganhos === false) {
      embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor("#ed1212")
        .setDescription(
          `<@${mensagem.author.id}> Antes de usar comandos é necessario se registrar utilizando o comando !registrar`
        );
    } else {
      const dados = banco.procurar(mensagem.author.id);
      embed = new MessageEmbed()
        .setTitle("Trabalho")
        .setColor(0x00ae86)
        .setDescription(
          `<@${dados.id}> trabalhou em uma lojinha e ganhou R$ ${ganhos},00`
        );
    }
    mensagem.channel.send({ embeds: [embed] });
  }
  if (mensagem.content.startsWith("!registrar")) {
    banco.registrar(mensagem.author);
    mensagem.channel.send("Registrado com sucesso!");
  }
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
