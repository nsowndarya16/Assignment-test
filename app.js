var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://52.52.1.12:27017/assigndb';


app.get('/hello', function(req, res){
	res.send('Helloo Stranger');
});

app.get('/hello/:name', function(req, res){
	var nam=req.params.name;
	res.send('Hello '+nam);
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	var dbo = db.db("assigndb");
	var myobj = { name:nam};
	dbo.collection("nametable").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
	db.close();
  });
	});
	
	
});

var port=process.env.PORT || 3000;
//var port=3000;
var server= app.listen(port,function(){
	
console.log('test exec listnening'+port);
});
