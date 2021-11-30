const mysql = require('mysql')
const cors = require('cors');

//Connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "lulu", 
    password: "", 
    database: "visitapp"
});
connection.connect();
//if connection is successful
if(connection){
    console.log("connection successful");
}else{
  console.log("connection failed");
}

module.exports = connection;