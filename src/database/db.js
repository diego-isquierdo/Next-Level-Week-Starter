//importando a dependencia do sqlite
const sqlite3 = require("sqlite3").verbose;

//criar o obj q fará operações no BD
const db = new sqlite3.Database("./src/database/database.db");