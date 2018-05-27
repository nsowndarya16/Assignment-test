var express = require('express');
var sayh = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/assigndb';


sayh.get('/hello', function(req, res){
	res.send('Hello Stranger');
});

sayh.get('/hello/:name', function(req, res){
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
sayh.listen(3000);
console.log('test exec listnening');