# HTTP-Connect

HTTP-Connect is a module that make http instance compatible with connect middleware. [http://senchalabs.github.com/connect]

```js
var PORT = 3000;
var http = require('http');

var url = require('url');

var connect = require('http-connect');

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
```

## Install HTTP-Connect

```bash
$ npm install http-connect
```

## Use with think.js

HTTP-Connect can be used in [think.js](https://github.com/75team/thinkjs) controllers.

```js
var connect = require('http-connect');

module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    init: function(http){
      this.super("init", http);
      //其他的通用逻辑
    },
    indexAction: function(){
      var self = this;
      var app = connect(this.http);

      app.use(function(req, res, next){
        //do sth.
      });
    }
  };
});
```

## License

[MIT](LICENSE)
