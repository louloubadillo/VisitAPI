const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('static'));

const connection = mysql.createConnection({
    //rewrite when testing
    host: "",
    user: "", 
    password: "", 
    database: ""
});
connection.connect();



// Regresa la lista de trabajadores
app.get('/trabajadores', (req, res) => {
    connection.query('SELECT * FROM Trabajadores; ', function (err, results, fields) {
        if (err) {
            res.status(500).send('No se puede establecer conexion con base de datos');
        }
        else {
            res.send(results);
        }
    })
});


// PORT
const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));