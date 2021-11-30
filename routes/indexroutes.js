const {Router} = require('express');
const router = Router()
const verify = require("../middleware/verifyAccess")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv');
const connection = require('../connection')
const cookieParser = require('cookie-parser');

require('dotenv').config({path: '../.env'})

router.use(cookieParser());


//login 
router.get('/login', (req,res) => {
    res.redirect("/adminIndex.html");
})

router.post('/login', function(req,res){
    var {user, password} = req.body;
    if(user == process.env.USERNAME && password == process.env.PASSWORD){
        const token = jwt.sign(
            {user: user},
            process.env.SECRET,
            {expiresIn: "1h"}
            )
        console.log("token: "+token)
        res.cookie("access_token", token, {httpOnly: true})
        res.redirect("/adminIndex.html")
    }else{
        res.send("El usuario o contraseña no son correctos. 😥")
        res.redirect('/')
    }
})


//Trabajadores
//Agregar trabajador a la base de datos
router.post('/agregar-trabajador', verify, function (req, res){
    data = req.body;
    // console.log(data);
    connection.query('INSERT INTO Trabajadores SET ?', data, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha añadido al trabajador de manera exitosa');
    })
  })

//Modificar 
router.post('/modificar-trabajador', verify, function (req, res){
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
router.post('/borrar-trabajador', verify, function (req, res){
    let userID = req.body.id_trabajador;
    connection.query('DELETE FROM Trabajadores WHERE id_trabajador='+userID, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha eliminado al trabajador de manera exitosa');
    })
  })
  
// Regresa la lista de trabajadores
router.get('/trabajadores', verify,  function (req, res) {
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
router.post('/agregar-departamento', verify, function (req, res){
    data = req.body;
    // console.log(data);
    connection.query('INSERT INTO Departamentos SET ?', data, (err, results, fields)=>{
        console.log(err)
        res.send('Se ha añadido el departamento de manera exitosa');
    })
})

//Modificar departamento
router.post('/modificar-departamento', verify, function (req, res){
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
router.post('/borrar-departamento', verify, function (req, res){
    let ID = req.body.id_departamento;
    connection.query('DELETE FROM Departamentos WHERE id_departamento='+ID, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha eliminado el departamento de manera exitosa');
    })
  })

  // Regresa la lista de departamentos
router.get('/departamentos', verify, function (req, res) {
    connection.query('SELECT * FROM Departamentos; ', function (err, results, fields) {
        if (err) {
            res.status(500).send('No se puede establecer conexion con base de datos');
        }
        else {
            res.send(results);
        }
    })
});

//Visitas
//Agregar visita a la base de datos
router.post('/agregar-visita', verify, (req, res)=>{
    data = req.body;
    // console.log(data);
    connection.query('INSERT INTO Visitas SET ?', data, (err, results, fields)=>{
        console.log(err)
        res.send('Se ha añadido la visita de manera exitosa');
    })
})
//Modificar visita
router.post('/modificar-visita', verify, (req, res)=>{
    data = req.body;
    let fecha = data['fecha'];
    let departamento = data['departamento'];
    let ID = data['id_visita'];
    connection.query('UPDATE Visitas SET ? WHERE id_visita='+ID, { departamento, fecha}, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha modificado la visita de manera exitosa');
    })
  })

//Borrar visita
router.post('/borrar-visita', verify, (req, res)=>{
    let ID = req.body.id_visita;
    connection.query('DELETE FROM Visitas WHERE id_visita='+ID, (err, results, fields)=>{
      console.log(err)
      res.send('Se ha eliminado la visita de manera exitosa');
    })
  })

  // Regresa la lista de visitas
router.get('/visitas', verify, (req, res) => {
    connection.query('SELECT * FROM Visitas; ', function (err, results, fields) {
        if (err) {
            res.status(500).send('No se puede establecer conexion con base de datos');
        }
        else {
            res.send(results);
        }
    })
});

//Views for graphs
router.get('/views/visitas_mes', verify, (req, res)=>{
    connection.query("SELECT * FROM visitas_mes", (err, results, fields)=>{
        if(err) console.log(err);
        else res.json(results);
    });
});

router.get('/views/visitas_departamento', verify, (req, res)=>{
    connection.query("SELECT * FROM visitas_departamento", (err, results, fields)=>{
        if(err) console.log(err);
        else res.json(results);
    });
});

router.get('/logout', (req,res)=> {

    res.clearCookie("access_token")
    res.redirect("/")
})

module.exports = router;