
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var tarea = require('./routes/tarea');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var io = io = require('socket.io');
var app = express();

mongoose.connect("mongodb://localhost");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
tarea.agregarRutas(app, '/tarea', io);

var servidor = http.createServer(app);
io = io.listen(servidor);
tarea.establecerSocket(io);

servidor.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

