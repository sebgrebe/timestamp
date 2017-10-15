var express = require('express')
var app = express()
var natural, unix;
var obj;
var obj_null = {
					"unix": null,
					"natural": null
				}
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
function getNatural(DateObj) {
	var day = DateObj.getDate()
	var month = months[DateObj.getMonth()]
	var year = DateObj.getFullYear()
	natural = month+' '+day+', '+year
	return natural
}

const port = process.env.PORT || 4000;

app.use(express.static('app'))
app.get( '/', function( req, res ) {
    res.sendFile('index.html',{root: 'app'});
  });

app.get( '/*', function( req, res ) {
		var input = req.url.substr(1);
		var input_cleaned = input.replace(/%20/g, ',');
		if (isNaN(input)) {
			var date_obj = new Date(input_cleaned);
			if (isNaN(date_obj.getTime())) {
				obj = obj_null
			}
			else {
				unix = date_obj.getTime()/1000
				obj = {
					"unix": unix,
					"natural": getNatural(date_obj)
				}
			}
			
		}
		else if (isNaN(input) === false) {
			var input_num = parseInt(input)
			var date_obj = new Date(input_num*1000)
			if (isNaN(date_obj.getTime())) {
				obj = obj_null
			}
			else {
				unix = input_num;
				obj = {
					"unix": unix,
					"natural": getNatural(date_obj)
				}
			}
		}
		res.send(obj)
	});

app.listen(port); 
console.log("App running on port 4000")