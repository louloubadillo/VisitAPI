const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('static'));

const connection = mysql.createConnection({
    host: "localhost",
    user: "lulu", 
    password: "", 
    database: "visitapp"
});
connection.connect();

//Trabajadores
//Agregar trabajador a la base de datos
app.post('/agregar-trabajador', (req, res)=>{
    data = req.body;
    // console.log(data);
    connection.query('INSERT INTO Trabajadores SET ?', data, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha añadido al trabajador de manera exitosa');
    })
  })

//Modificar 
app.post('/modificar-trabajador', (req, res)=>{
    data = req.body;
    let nombre = data['nombre'];
    let email = data['email'];
    let esEncargado = data['encargado']
    let userID = data['id_trabajador'];
    connection.query('UPDATE Trabajadores SET ? WHERE id_trabajador='+userID, { nombre, email, esEncargado }, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha modificado el trabajador de manera exitosa');
    })
    
  })

//Borrar trabajador
app.post('/borrar-trabajador', (req, res)=>{
    let userID = req.body.id_trabajador;
    connection.query('DELETE FROM Trabajadores WHERE id_trabajador='+userID, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha eliminado al trabajador de manera exitosa');
    })
  })
  
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

//Departamentos
//Agregar departamento a la base de datos
app.post('/agregar-departamento', (req, res)=>{
    data = req.body;
    // console.log(data);
    connection.query('INSERT INTO Departamentos SET ?', data, (err, results, fields)=>{
        console.log(err)
        res.send('Se ha añadido el departamento de manera exitosa');
    })
})
//Modificar departamento
app.post('/modificar-departamento', (req, res)=>{
    data = req.body;
    let nombre = data['nombre'];
    let id_encargado = data['id_encargado'];
    let ID = data['id_departamento'];
    connection.query('UPDATE Departamentos SET ? WHERE id_departamento='+ID, { nombre, id_encargado }, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha modificado el departamento de manera exitosa');
    })
  })

//Borrar departamento
app.post('/borrar-departamento', (req, res)=>{
    let ID = req.body.id_departamento;
    connection.query('DELETE FROM Departamentos WHERE id_departamento='+ID, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha eliminado el departamento de manera exitosa');
    })
  })
  // Regresa la lista de trabajadores
app.get('/departamentos', (req, res) => {
    connection.query('SELECT * FROM Departamentos; ', function (err, results, fields) {
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