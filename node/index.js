const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const names = ['Marco', 'Priscila', 'Isabela', 'Benjamin', 'Samuel']
const mysql = require('mysql')

const conn = mysql.createConnection(config)
let createTodos = `create table if not exists people(
    id int primary key auto_increment,
    name varchar(255)
)`;
conn.query(createTodos)
conn.end()

app.get('/', (req,res) => {
    const conn = mysql.createConnection(config)
    var message = '<h1>Full Cycle Rocks!</h1>';

    names.forEach(name => {
        var sql = `INSERT INTO people(name) values('${name}')`
        conn.query(sql)
        message += `- Nome inserido ${name}. <br/>`
    })
    conn.end()
    res.send(message)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})