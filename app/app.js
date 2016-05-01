var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

var routes = require('./routes/index');

var app = express();


if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
dotenv.load({});

app.use(favicon(path.join(__dirname, '../public/images', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/', routes);

module.exports = app;
