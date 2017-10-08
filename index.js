var express = require('express')
var app = express()
var time = [];

const port = process.env.PORT || 4000;

app.use(express.static('app'))
app.get( '/', function( req, res ) {
    res.sendFile('index.html',{root: 'app'});
  });

app.get( '/*', function( req, res ) {
	if (req.url === '/data') {
		res.send(time[0])
	}
	else {
		time.unshift(req.url);
    	res.sendFile('reply.html',{root: 'app'})
    }
});

app.listen(port); 