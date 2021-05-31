const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const templete = require('./templete');
var sign = require('./sign');
var cookie = require('cookie');

var server = http.createServer((request, response) => {
  var _url = request.url;
  var ID = url.parse(_url, true).query.id;
  var user = "";
  var cookies = {};
  var isOwner = false;

  //Load cookie
  if(request.headers.cookie != undefined){
    cookies = cookie.parse(request.headers.cookie);
  }

  //Authentification check
  sign.Signin(cookies.username, cookies.password).then((result) => {
    console.log("로그인 결과: "+result);//시간차 둘것
    if(result){
      isOwner = true;
      user = cookies.username;
    }

    //log printing
    console.log(cookies);
    console.log("isOwner: "+isOwner);
    console.log("user: "+user);
    console.log("url: "+_url);
    console.log(" ");

    //Routing
    if(_url === '/'){
      response.writeHead(200);
      response.end(templete.HTML('Home', user));
    }
    else if(ID != undefined){
      fs.readdir('data', (err, fileList)=>{
        if(!fileList.includes(ID)){
        response.writeHead(404);
        response.end("<b>Not Found</b>");
        }
        else{
          response.writeHead(200);
          response.end(templete.HTML(ID, user, cookies.status));
        };
      });
    }
    else if(_url === '/login_process'){
      var body = '';
      request.on('data', (data) => {
        body = body + data;
      });
      request.on('end', () => {
        var account = qs.parse(body);
        var id = account.id;
        var pw = account.pw;
        console.log(account);
        sign.Signin(id,pw).then((result) => {
          if(result){
            response.writeHead(302, {
              'Set-Cookie':[
                `username=${id}; HttpOnly Max-Age=${60*60*24*30}`,
                `password=${pw}; HttpOnly Max-Age=${60*60*24*30}`,
                'status=none'
              ],
              Location: '/'
          });
            response.end();
          }
          else{
            response.writeHead(302, {
              'Set-Cookie':[
                'status=wrong'
              ],
              Location: '/?id=Signin'});
            response.end();
          }
        });
      });
    }
    else if(_url === '/signup_process'){
      var body = '';
      request.on('data', (data) => {
        body = body + data;
      });
      request.on('end', () => {
        var account = qs.parse(body);
        var id = account.id;
        var pw = account.pw;
        sign.Signup(id,pw).then((result) => {
          if(result){
            response.writeHead(302, {
              'Set-Cookie':[
                `username=${id}; HttpOnly Max-Age=${60*60*24*30}`,
                `password=${pw}; HttpOnly Max-Age=${60*60*24*30}`,
                'status=none'
              ],
              Location: '/'
          });
            response.end();
          }
          else{
            response.writeHead(302, {
              'Set-Cookie':[
                'status=taken'
              ],
              Location: '/?id=Signup'});
            response.end();
          }
        });
      });
    }
    else if(_url == '/logout'){
      response.writeHead(302, {
        'Set-Cookie':[
          `username=; Max-Age=0`,
          `password=; Max-Age=0`,
          'status=none'
        ],
        Location: '/'
      });
      response.end();
    }
    else{
      var script;
      try{
        script = fs.readFileSync(__dirname + "\\" + _url);
        response.writeHead(200);
      }
      catch{
        script = "<b>Not Found</b>";
        response.writeHead(404);
      }
      response.end(script);
    }
  });
});
server.listen(80);