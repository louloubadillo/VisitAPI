const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
require('dotenv').config({path: '../.env'})

function verifyToken(req,res,next) {

    const token = req.cookies.access_token;  

    if (!token) {
        console.log("no token")
        return res.redirect('/')
    }
    // Validar el token 
    else {
        console.log("token")
        jwt.verify(token, process.env.SECRET, function(err, data){

            if (err){
                console.log(err)
                return res.redirect('/')
            }
            else {
                next()
            }

        })

    }

}

module.exports = verifyToken