const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const trabalhar = require("../comandos/trabalhar");

var db = new JsonDB(new Config("usuarios", true, false, "/"));
function adicionar(caminho, perfil) {
  db.push(caminho, { id: perfil.id, nome: perfil.username, dinheiro: 0 });
}
module.exports = {
  registrar: function registrar(perfil) {
    var caminho = "/" + perfil.id;
    adicionar(caminho, perfil);
    console.log("a");
  },
  dinheiros: function dinheiro(operacao, usuario) {
    if (operacao === true) {
      const caminho = "/" + usuario;
      try {
        db.getData(caminho);
      } catch (error) {
        return false;
      }
      var dinheiro = db.getData(caminho);
      const trabalho = trabalhar();
      dinheiro.dinheiro += trabalho;
      adicionar(caminho, usuario);
      return trabalho;
    }
  },
  procurar: function procurar(id) {
    const caminho = "/" + id;
    try {
      return db.getData(caminho);
    } catch (error) {
      return false;
    }
  },
};
