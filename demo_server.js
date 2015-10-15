var PORT = 3000;
var http = require('http');

var url = require('url');

var connect = require('./index.js');

var server = http.createServer(function (request, response) {
  var app = connect({
    req: request,
    res: response,
    pathname: url.parse(request.url).pathname
  });

  var cookieParser = require('cookie-parser');

  app.use(cookieParser());

  app.use(function(req, res, next){
    res.write(JSON.stringify(req.cookies));
    res.end();
  });
});

server.listen(PORT);

console.log("Server runing at port: " + PORT + ".");
