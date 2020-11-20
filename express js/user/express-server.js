const express = require('express');
//const script = require('./logic.js');
let app = express();

app.use(function(res,req,next){
    console.log(res.method);
    console.log(req.url);
    console.log(req.path);
   // next();
});



app.listen(3000);
console.log("Listening on port 3000");

