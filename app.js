var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var monk = require('monk');
var mongo = require('mongodb').MongoClient;
var db; //= monk('mongodb://bisoye:bisoye@ds111771.mlab.com:11771/gso-soldiers');

var index = require('./routes/index');
var users = require('./routes/users');
var init = require('./routes/init');
var ops = require('./routes/ops');
var med_reqs = require('./routes/med_reqs');
var plays = require('./routes/plays');

var app = express();


mongo.connect('mongodb://bisoye:bisoye@ds111771.mlab.com:11771/gso-soldiers', (err, database) => {
    if (err) return console.log(err)
    db = database
    console.log("Connected");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/images/BoroSo Simple.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
	req.db = db;
	next();
});

app.use('/', index);
app.use('/users', users);
app.use('/init', init);
app.use('/ops', ops);
app.use('/med_reqs', med_reqs);
app.use('/playbook', plays);

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
