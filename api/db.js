import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "thiago_UFPR12",
    database: "crud"
})