var express    = require("express");
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'mysqlhost',
   user     : 'root',
   password : 'root',
   database : 'test',
   port: 3306
 });
 var app = express();

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.get("/",function(req,res){
 connection.query('SELECT value from Interrupts', function(err, result, fields) {
// connection.end();
   if (!err)
     {console.log('The solution is: ', result);
       //res.send(JSON.stringify({result}));
	res.send(result)
       //connection.end();
      }
   else
     console.log(err);
     //console.log('Error while performing Query.');
   });
 });

 app.listen(3001);
