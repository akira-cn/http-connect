/**
 * make http instance compatible with connect middleware (http://senchalabs.github.com/connect)
 *
    var connect = require('http-connect');
    var conf = {
      req: request,
      res: response,
      pathname: '*'
    };

    var app = connect(conf);
    app.use('/foo/bar', function(req, res, next){
      //do sth...
      next();
    });
 */

var Promise = require('es6-promise').Promise;

function Connect(http){
  this.http = http;
  if(!http.req.query){
    var Qs = require('qs');
    http.req.query = Qs.parse(http.req.url.split('?')[1]||'');
  }
}

Connect.prototype.use = function(route, middleware){
  if(route instanceof Function){
    middleware = route;
    route = '*';
  }
  var http = this.http;
  var req = http.req;
  var res = http.res;
  var pathname = '/' + http.pathname.replace(/^\//,'');

  if(route !== '*' && route !== pathname){
    return;
  }

  var arity = middleware.length;

  var promise = Promise.resolve();

  promise = promise.then(function(err){
    return new Promise(function(resolve, reject){
      if(!err){
        middleware(req, res, resolve);
      }else{
        if(arity < 4){
          resolve(err);
        }else{
          middleware(err, req, res, resolve);
        }
      }
    });
  });
}

module.exports = function(http){
  return new Connect(http);
};