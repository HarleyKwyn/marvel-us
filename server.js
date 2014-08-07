var express = require('express');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('public/index.html', { root: __dirname });
});
app.listen(3000);
console.log("Server listening on port 3000");