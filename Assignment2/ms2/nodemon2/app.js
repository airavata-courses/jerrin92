var express    = require("express");
var mysql      = require('mysql');
var amqp = require('amqplib/callback_api');

 var connection = mysql.createConnection({
   host     : 'mysqlhost',
   //host: 'localhost',
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

 function mysqlToRabbit() {
 connection.query('SELECT value from Interrupts', function(err, result, fields) {
// connection.end();
   if (!err)
     {
        console.log('The solution is: ', result);
        //res.send(JSON.stringify({result}));
        result = JSON.stringify(result);
        //might have to restructure the url after dockerisation
//        amqp.connect('amqp://guest:guest@localhost', function(err, conn) {
        amqp.connect('amqp://rabbithost', function(err, conn) {
            conn.createChannel(function(err, ch) {
              var q = 'interrupt';

              ch.assertQueue(q, {durable: false});
              // Note: on Node 6 Buffer.from(msg) should be used
              ch.sendToQueue(q, new Buffer(result));
              //ch.sendToQueue(q,new Buffer('Hello'));
              console.log(" [x] Sent 'Result to the Queue'");
            });
      setTimeout(function() { conn.close();}, 500);
      //setTimeout(function() { conn.close(); process.exit(0) }, 500);
      });
       //res.send(result)
       //connection.end();
      }
   else
     console.log(err);
     //console.log('Error while performing Query.');
   });

}


//listen to RabbitMQ queue if request exists, read from mysql and put the data in the queue


//amqp.connect('amqp://guest:guest@localhost', function(err, conn) {
amqp.connect('amqp://rabbithost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'interrupt-request';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
      //get data from mysql and put it in the queue
      mysqlToRabbit();
    }, {noAck: true});
  });
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.get("/",function(req,res){
      mysqlToRabbit();
      res.send('Data in the queue');
 });

app.listen(3001);
