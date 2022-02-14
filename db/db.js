const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const trabalhar = require("../comandos/trabalhar");

var db = new JsonDB(new Config("usuarios", true, false, "/"));
function salvar(perfil) {
  caminho = "/" + perfil.id;
  db.push(caminho, {
    id: perfil.id,
    nome: perfil.nome,
    dinheiromao: perfil.dinheiromao,
    banco: perfil.banco,
  });
}
function adicionar(caminho, perfil) {
  db.push(caminho, {
    id: perfil.id,
    nome: perfil.username,
    dinheiromao: 0,
    banco: 0,
  });
}
function checagem(caminho) {
  try {
    db.getData(caminho);
  } catch {
    return false;
  }
  return true;
}
module.exports = {
  aposta: function aposta(resultado, quantia, perfil) {
    checagem(perfil);
    if (checagem) {
      var pessoa = this.procurar(perfil);
      if (perfil.dinheiromao < quantia) {
        return 2;
      } else {
        if (resultado === true) {
          pessoa.dinheiromao += quantia;
        } else {
          pessoa.dinheiromao -= quantia;
        }
      }
    } else {
      return false;
    }
  },
  registrar: function registrar(perfil) {
    var caminho = "/" + perfil.id;
    adicionar(caminho, perfil);
    console.log("a");
  },

  dinheiros: function dinheiro(operacao, perfil) {
    if (operacao === true) {
      const caminho = "/" + perfil.id;
      var teste = checagem(caminho);
      if (teste === false) {
        return false;
      } else {
        var dinheiro = db.getData(caminho);
        const trabalho = trabalhar();
        dinheiro.dinheiromao += trabalho;
        db.push(caminho, {
          id: dinheiro.id,
          nome: dinheiro.nome,
          dinheiromao: dinheiro.dinheiromao,
          banco: dinheiro.banco,
        });
        return trabalho;
      }
    }
  },

  procurar: function procurar(id) {
    const caminho = "/" + id;
    var teste = checagem(caminho);
    if (teste === false) {
      return false;
    } else {
      return db.getData(caminho);
    }
  },
};
