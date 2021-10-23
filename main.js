const http = require('http')
      fs =   require('fs'),
      url =  require('url');

const fibonacci = require("./build/Release/fibonacci.node")

var currentNum = '0';

const port = 3000;

const server = http.createServer((req, res) => 
{
  var path = url.parse(req.url).pathname;
  if(path == "/nextNum")
  {
    console.log('Requested next number');
    res.writeHead(200, {"Content-Type": "text/plain"});
    currentNum = fibonacci.get()
    res.end(currentNum);
    console.log(`Next(${currentNum}) number sent`);
  }
  else if(path == "/currentNum")
  {
    console.log('Requested current number');
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(currentNum);
    console.log(`Current(${currentNum}) number sent`);
  }
  else if(path == "/client-js")
  {
    console.log('Requested client code');
    fs.readFile('./client.js', function(err, file) 
    {  
      if(err) console.log(err);

      res.writeHead(200, { 'Content-Type': 'text/javascript' });  
      res.end(file, "utf-8");
      console.log('Client code sent');
    });
  }
  else
  {
    console.log('Requested web page');
    fs.readFile('./index.html', function(err, file) 
    {  
      if(err) console.log(err);

      res.writeHead(200, { 'Content-Type': 'text/html' });  
      res.end(file, "utf-8");
      console.log('Web page sent');
    });
  }
});

server.listen(port, '127.0.0.1', () => 
{
  console.log(`Server is up(http://127.0.0.1:${port}/)!`);
});