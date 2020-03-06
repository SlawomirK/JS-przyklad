
http = require('http');
const port=3000;
var operacje = {
    add: function(a,b){return a+"+"+b+"="+( a+b)},
    sub: function(a,b){return a+"-"+b+"="+(a-b)},
    mul: function(a,b){return a+"*"+b+"="+(a*b)},
    div: function(a,b){return a+"/"+b+"="+(a/b)}
}

http.createServer(function(req,res){
    var czesciUrl=req.url.split("/");
    var operacja = operacje[czesciUrl[1]];
    var a = parseInt(czesciUrl[2]);
    var b = parseInt(czesciUrl[3]);

    var wynik = operacja ? operacja(a,b):"Error. Niepoprawne dane";
    res.writeHead(200,{'Content-type':'text/html'});
    res.write("<h1 style='text-align: center; font-size: 72px; display: flex; justify-content: center; padding: 20% 0'>"+wynik+"</h1>");
    res.end();

}).listen(port,"127.0.0.1");
console.log("Server 7a pracuje na porcie "+port);