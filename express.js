const templete = require("./templete");
const sign = require("./sign");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const posts = require("./posts");
const sanitizer = require("sanitize-html");
const MySQLStore = require("express-mysql-session")(session);
// const router = require('express').Router();
import User from "./User";

const app = express();

app.use(cookieParser());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: User.secret,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      port: 3306,
      user: "root",
      password: User.password,
      database: "db",
    }),
  })
);
var user;
var count_visit = 0;

app.get("/", (req, res) => {
  console.log("!!!!!Someone visited my server!!!!!");
  res.send(templete.ServerHome());
});

app.get("/portfolio", (req, res) => {
  console.log("/portfolio");
  console.log(req.session);
  count_visit = count_visit + 1;
  var status = req.cookies.status;
  if (req.session.isLogin) {
    user = req.session.username;
  } else {
    user = "";
  }
  console.log("user: " + user);
  res.cookie("status", "none");
  res.send(
    templete.HTML("home", user, status) +
      `<div class="more" style="justify-content: center; margin-top:100px; color: rgba(255, 255, 255, 0.8); font-family: inherit;">
    <span>Visitors: ${count_visit}</span></div>`
  );
});

app.get("/portfolio/page/:pageID", (req, res) => {
  var ID = req.params.pageID;
  console.log("/portfolio/" + ID);
  var status = req.cookies.status;
  console.log(status);
  if (req.session.isLogin) {
    user = req.session.username;
  } else {
    user = "";
  }
  res.cookie("status", "none");
  if (ID == "home") {
    res.send(
      templete.HTML(ID, user, status) +
        `<div class="more" style="justify-content: center; margin-top:100px; color: rgba(255, 255, 255, 0.8); font-family: inherit;">
        <span>Visitors: ${count_visit}</span></div>`
    );
  } else {
    res.send(templete.HTML(ID, user, status));
  }
});

app.get("/portfolio/create", (req, res) => {
  console.log("/portfolio/create");
  var status = req.cookies.status;
  console.log(status);
  if (req.session.isLogin) {
    user = req.session.username;
    res.cookie("status", "none");
    res.send(templete.HTML("create", user));
  } else {
    user = "";
    res.cookie("status", "needlogin");
    res.redirect("/portfolio/page/posts");
  }
  res.end();
});

app.post("/portfolio/create_process", (req, res) => {
  console.log("/portfolio/create_process");
  var thread = req.body;
  console.log(thread);
  posts.post(
    sanitizer(thread.title),
    sanitizer(thread.content),
    req.session.username
  );
  res.redirect("/portfolio/page/posts");
});

app.post("/portfolio/delete_process", (req, res) => {
  console.log("/portfolio/delete_process");
  posts.delete(req.body.idx);
  res.redirect("/portfolio/page/posts");
  res.end();
});

app.post("/portfolio/edit", (req, res) => {
  console.log("/portfolio/edit");
  res.send(templete.HTML("edit", req.session.username, "none", req.body.idx));
  res.end();
});

app.post("/portfolio/edit_process", (req, res) => {
  console.log("/portfolio/edit_process");
  var thread = req.body;
  posts.edit(thread.idx, sanitizer(thread.title), sanitizer(thread.content));
  res.redirect("/portfolio/page/posts");
  res.end();
});

app.post("/portfolio/login_process", (req, res) => {
  console.log("/portfolio/login_process");
  var account = req.body;
  var id = sanitizer(account.id);
  var pw = sanitizer(account.pw);
  sign.Signin(id, pw).then((result) => {
    if (result) {
      req.session.isLogin = true;
      req.session.username = id;
      req.session.save(() => {
        res.cookie("status", "welcome");
        res.redirect("/portfolio");
      });
    } else {
      res.cookie("status", "wrong");
      res.redirect("/portfolio/page/signin");
    }
    res.end();
  });
});

app.post("/portfolio/signup_process", (req, res) => {
  console.log("/portfolio/signup_process");
  var account = req.body;
  var id = account.id;
  var pw = account.pw;
  sign.Signup(id, pw).then((result) => {
    if (result) {
      req.session.isLogin = true;
      req.session.username = id;
      req.session.save(() => {
        res.cookie("status", "welcome");
        res.redirect("/portfolio");
      });
    } else {
      res.cookie("status", "taken");
      res.redirect("/portfolio/page/signup");
    }
    res.end();
  });
});

app.get("/portfolio/logout", (req, res) => {
  console.log("/portfolio/logout");
  sign.sessionStay(req.session.username, null);
  req.session.isLogin = false;
  delete req.session.username;
  req.session.save(() => {
    res.redirect("/portfolio");
  });
});

app.post("/portfolio/likes", (req, res) => {
  console.log("/portfolio/likes");
  console.log(req.body);
  var result = posts.likes(req.body.index, req.body.user, req.body.method);
  res.send(result);
});

app.post("/portfolio/comment", (req, res) => {
  console.log("/portfolio/comment");
  var result = posts.comments(
    req.body.postidx,
    req.body.author,
    req.body.content
  );
  res.send(`${result}`);
});

app.post("/portfolio/comment_del", (req, res) => {
  console.log("/portfolio/comment_del");
  posts.comments_del(req.body.commentidx, req.body.postidx);
  res.end();
});

app.use(function (req, res) {
  res.redirect("/portfolio");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(80, () => console.log("My server listening on port 80!"));
