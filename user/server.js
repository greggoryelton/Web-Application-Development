let http = require('http');
var fs = require('fs');
let path = require('path');

let mimes = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
}
const server = http.createServer(function(request,response){
    if(request.method == 'GET'){
        let fileurl;
        if(request.url == "/"){
            fileurl = "index.html";

        }else{
            fileurl = request.url;
        }
        let fpath = path.resolve("./"+ fileurl);
        let fext = path.extname(fpath);
        let mimeType = mimes[fext];
        //console.log(fpath);

        fs.exists(fpath,function(exists){
            if(!exists){
                //console.log(fpath);
                return;
            };
            response.writeHead(200,{'content-type': mimeType});
            fs.createReadStream(fpath).pipe(response);

        });

    }

   

});

function parseURL(args){
    
}

server.listen(3000);
console.log('Server Running @ http://127.0.0.1:3000/');

