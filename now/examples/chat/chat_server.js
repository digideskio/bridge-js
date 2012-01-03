var static = require('node-static');
var file = new(static.Server)(__dirname+'/public');
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    });
}).listen(9000);

var Now = require(__dirname+'/../../lib/now.js').Now;
// now = new Now({host: 'ec2-50-19-181-20.compute-1.amazonaws.com'});

now = new Now({host: 'localhost'});

var ChatServer = {
  handle_join: function(name, handler, callback){
    now.joinChannel('lobby', handler, callback);
  },
}
now.publishService('chat', ChatServer, function(){ 
    console.log('started chatserver');
});



