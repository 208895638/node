var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');
var db = require("./db");
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "keyboard cat"
}))
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res) {
    res.render("index", { list: db.getList(), logined: req.session.logined })
})
app.get("/delate", function(req, res) {
    var index = req.query.index;
    db.del(index);
    res.redirect("/");
})
app.get("/get/:index", function(req, res) {
    var index = req.params.index;
    var article = db.get(index);
    res.send(article);
    console.log("获取的值为", index);
})
app.post("/add", function(req, res) {
    db.add({ title: req.body.title });
    res.redirect("/");
})
app.post("/update", function(req, res) {
    var index = req.body.index;
    var title = req.body.title;
    console.log("获取的值为" + index, title)
    db.update(index, { title });
    res.redirect("/");
})
app.get("/logout", function(req, res) {
    req.session.logined = false;
    res.redirect("/");
})
app.post("/login", function(req, res) {
        var loginname = req.body.loginname;
        var password = req.body.password;
        console.log(loginname, password)
        if (loginname == "haha" && password == "123") {
            req.session.logined = true;
            res.send("success");
        } else {
            res.send("error")
        }

    })
    // catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;