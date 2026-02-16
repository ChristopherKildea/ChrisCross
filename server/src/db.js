const Pool = require("pg").Pool;
const dotenv = require("dotenv")

const pool = new Pool({
    user: "postgres",
    password: "AtomBombBruno",
    host: "localhost",
    port: 5432,
    database: "chriscross_db"
});

module.exports = pool;