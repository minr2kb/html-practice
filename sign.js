const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mkb1129ok',
    database : 'db'
    });
connection.connect();

module.exports = {
    Signin: function(id, pw){
        connection.query(`SELECT * FROM users`, (error, result, fields) => {
            console.log(result);
        })

        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE username = '${id}' AND password = '${pw}'`, (error, result, fields) => {
                if(result.length<1){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            });
        })
    },
    
    Signup: function(id, pw){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE username = '${id}'`, (error, result, fields) => {
                if(result.length > 0){
                    resolve(false);
                }
                else{
                    connection.query("INSERT INTO db.users (username, password) VALUES "+`('${id}', '${pw}');`, (error, result, fields) => {
                        resolve(true);
                    }); 
                }
            });  
        });
    },

    sessionStay: function(id, sid){
        if(sid == null){
            connection.query(`UPDATE users SET sid=null WHERE username='${id}';`, (error, result, fields) => {
            });
        }
        else{
            connection.query(`UPDATE users SET sid='${sid}' WHERE username='${id}';`, (error, result, fields) => {
            });
        }
    }
}