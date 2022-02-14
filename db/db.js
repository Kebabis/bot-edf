const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const trabalhar = require("../comandos/trabalhar");

var db = new JsonDB(new Config("usuarios", true, false, "/"));
module.exports = {
  registrar: function registrar(perfil) {
    var caminho = "/" + perfil.id;
    db.push(caminho, { id: perfil.id, nome: perfil.username, dinheiro: 0 });
    console.log("a");
  },
  dinheiros: function dinheiro(operacao, usuario) {
    if (operacao === true) {
      const caminho = "/" + usuario;
      var dinheiro = db.getData(caminho);
      const trabalho = trabalhar();
      dinheiro.dinheiro += trabalho;
      db.push(caminho, {
        id: dinheiro.id,
        nome: dinheiro.nome,
        dinheiro: dinheiro.dinheiro,
      });
      return trabalho;
    }
  },
  procurar: function procurar(id) {
    const caminho = "/" + id;
    return db.getData(caminho);
  },
};
