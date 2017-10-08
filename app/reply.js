var natural, unix;
var obj;
var obj_null = {
					"unix": null,
					"natural": null
				}
var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
function getNatural(DateObj) {
	var day = DateObj.getUTCDate()
	var month = months[DateObj.getUTCMonth()]
	var year = DateObj.getUTCFullYear()
	natural = month+' '+day+', '+year
	return natural
}
$(document).ready(function() {
	var div = document.getElementById('output');
	$.ajax({
		url: '/data',
		type: 'GET',
		error: (xhr,errorType) => {
				alert(errorType)
			},
		success: (data) => {
			var input = data.substr(1);
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
			div.innerHTML = JSON.stringify(obj)
		}
	})
})