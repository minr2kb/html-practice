var http = require('http');
var cookie = require('cookie');

http.createServer((request, response) => {
    var cookies = {};
    if(request.headers.cookie != undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    response.writeHead(200, {
        'Set-Cookie':[
            'test = 2'
        ]
    });
    response.end('cookie!');
}).listen(3000);