var express = require('express');
var router = express.Router();
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
  })

app.get('/:senario_name', (req, res) => {
    const senario_name = req.params.senario_name;
    const selectSql = "SELECT * FROM record_all WHERE senario_name = ?"
    connection.query(selectSql,[senario_name],(err, result) => {
        if (err) throw err;
        res.json(result);
    })
});