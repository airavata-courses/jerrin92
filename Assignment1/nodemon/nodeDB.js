var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test"
});


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT value FROM Loads", function (err, result, fields) {
    if (err) throw err;
    else{
    fs.writeFile('/Users/jerkatta/Acads/scienceGateway/data.json', JSON.stringify({result}), function (err) {
    if (err) throw err;
	  console.log(result);
          console.log('Saved!');
    });
    //console.log(result);
   }
  });
});


