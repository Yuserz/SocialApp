const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require("hbs/lib/async");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req ,res) => {
    console.log(req.body);

    const{username, number, password, confirmPassword} = req.body;
    
    db.query('SELECT username FROM usertable WHERE username = ?', [username], async (error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'Username already taken'
            })
        }else if(password !== confirmPassword){
            return res.render('register', {
                message: 'Password do not match'
            });
        }

        // let hashedPassword = await bcrypt.hash(password, 8); //hash or encrypt the password for security
        // console.log(hashedPassword);

        db.query('INSERT INTO usertable SET ?', {username: username, number: number, password: password}, (error, results) => {
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('register', {
                    message: 'User Registered'
                });
            }
        })
    })  
}


exports.index = (req ,res) => {
    // console.log(req.body);

    const input = {username,password} = req.body;
    const input2 = JSON.parse(JSON.stringify(input))
    console.log(input2)

    db.query('SELECT * FROM usertable WHERE username = ? and password = ?', [username, password] , (error, results) =>{
        
        //convert the data from database to an object
        // console.log(results[1].)

        const data = JSON.parse(JSON.stringify(results))
        console.log(data)
        
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            console.log("success")
                res.redirect("/home");
        }else{
            return res.render('index', {
                message: 'Password do not match'
            });
        }
    })
}