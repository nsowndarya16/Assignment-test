var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://3.231.111.78:27017/newdemo';


app.get('/welcome', function(req, res){
	res.send('Welcome Stranger');
});

app.get('/welcome/:name', function(req, res){
	var nam=req.params.name;
	res.send('Welcome '+nam);
	MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
	if (err) throw err;
	var dbo = db.db("newdemo");
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
