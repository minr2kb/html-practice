// export let id= ['minr2kb']
// export let pw= ['mkb1129ok']

let json = JSON.stringify(true);

var DB = {
    id: ['minr2kb'],
    pw: ['mkb1129ok']
}

// json = JSON.stringify(DB, ['id']);

json = JSON.stringify(DB);
console.log(json);

let obj = JSON.parse(json);
console.log(obj);

// let mysql = require('mysql');
// let connection = mysql.createConnection(
//     {
//         host : 'localhost',
//         user: 'root',
//         password: '0150',
//         database: 'world'
//     }
// );
// connection.connect();
// connection.query('SELECT * FROM city', function(error, results, fields)
// {
//     if(error)
//     {
//         console.log(error);
//     }
//     console.log('info is: ', results);
// }
// );
// connection.end();