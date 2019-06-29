var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : process.env.MYSQL_HOST,
   user     : process.env.MYSQL_USER,
   password : process.env.MYSQL_PASS
 });
 var app = express();

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

 app.get("/",function(req,res){
 connection.query('SELECT NOW() as tm', function(err, rows, fields) {
   if (!err)
     console.log('The time is: ', rows[0].tm);
   else
     console.log('Error while performing Query.');
   });
 });

app.listen(3000);
