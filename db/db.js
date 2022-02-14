const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

var db = new JsonDB(new Config("usuarios", true, false, "/"));
function registrar(perfil) {
  db.push("/", [{ id: perfil.id, nome: perfil.username, dinheiro: 0 }]);
  console.log("a");
}
module.exports = registrar;
