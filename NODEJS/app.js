const http = require('http');
const fs  = require('fs');

// function rqListener(req, res){

// }

// http.createServer(rqListener);

// Or we can use anonymous functions as well!

//create Server is always executed whenever a request reaches our server!

// http.createServer(function(req, res){
// });

//http.createServer() will actually return a server!

const server = http.createServer((req,res) =>{
    //console.log(req);
    // console.log(req.url, req.method, req.headers);
    //process.exit();

    const url = req.url;
    const method =  req.method;
    if(url === '/')
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first Node Js Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url==='/message' && method === "POST")
        {
            const body =[];
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                console.log(parsedBody);
                const message = parsedBody.split("=")[1];
                //fs.writeFileSync('message.txt', message);
                fs.writeFile('message', err => {
                    res.statusCode = 302;
                    res.setHeader('Location', '/'); // Write this to tell the server that once this function executes, do this!
                    return res.end();
                })
            });
            
            // res.statusCode = 302;
            // res.setHeader('Location', '/');
            // return res.end();
        }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Node Js Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
    //After res.end(), we cannot write it anymore!

    
});


server.listen(3000);