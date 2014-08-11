var express = require('express');
var app = express();
var publicDir = '/public' //for development or 'dist' for production

app.use(publicDir, express.static(__dirname + publicDir));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile( publicDir+'/index.html', { root: __dirname });
});

app.listen(3000);
console.log("Server listening on port 3000");