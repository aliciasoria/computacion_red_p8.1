var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
//MIS COSAS
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');


var app = express();
//MIS COSAS
app.use(partials());
app.use(methodOverride('_method',{methods:["POST","GET"]}));
app.use(session({
  secret:"whatever",
  resave: true,
  saveUninitialized: true
}));
//app.get('/',function(req,res){req.session.randomPlay;});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
