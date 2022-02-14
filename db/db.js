import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

var db = new JsonDB(new Config("usuarios", true, false, "/"));

db.push("/teste", 3);
