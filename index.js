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
const escolherlocal = require("./comandos/local");
client.once("ready", () => {
  console.log("Pai ta on 😎");
});
var embed;

client.on("messageCreate", async (mensagem) => {
  if (mensagem.content.startsWith("!depositar")) {
  }

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
          `O saldo de <@${mensagem.author.id}> é de: \n No banco: R$ ${
            dados.banco
          },00 \n Na mão: R$ ${dados.dinheiromao},00 \n Total: R$ ${
            dados.dinheiromao + dados.banco
          },00 `
        )
        .setFooter(
          `Comando enviado por ${mensagem.author.username}#${mensagem.author.discriminator} (${mensagem.author.id})`
        );
    }
    mensagem.channel.send({ embeds: [embed] });
  }

  if (mensagem.content.startsWith("!trabalhar")) {
    var ganhos = banco.dinheiros(true, mensagem.author);
    if (ganhos === false) {
      embed = new MessageEmbed()
        .setTitle("Erro")
        .setColor("#ed1212")
        .setDescription(
          `<@${mensagem.author.id}> Antes de usar comandos é necessario se registrar utilizando o comando !registrar`
        );
    } else {
      local = escolherlocal();
      embed = new MessageEmbed()
        .setTitle("Trabalho")
        .setColor(0x00ae86)
        .setDescription(
          `<@${mensagem.author.id}> trabalhou em ${local} e ganhou R$ ${ganhos},00`
        )
        .setFooter(
          `Comando enviado por ${mensagem.author.username}#${mensagem.author.discriminator} (${mensagem.author.id})`
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
      banco.aposta(resul, separado[1], mensagem.author.id);
    } else {
      banco.aposta(resul, separado[1], mensagem.author.id);
    }
  }
});

client.login(token);
