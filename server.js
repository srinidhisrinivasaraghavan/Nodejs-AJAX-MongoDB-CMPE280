var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs')

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/assets/fonts'));
app.use(express.static(__dirname + 'assets/js'));
app.use(express.static(__dirname + '/assets/sass'));

//Get the page
app.get('/register.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

//Post the data to server
app.post('/Save', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       userId:req.body.userId,
       email:req.body.email,
       password:req.body.password,    
       mobile:req.body.mobile,       
       ques1:req.body.ques1,       
       ans1:req.body.ans1,      
       ques2:req.body.ques2,      
       ans2:req.body.ans2,      
       address:req.body.address,     
       interests:req.body.interests,
   };
   console.log(response);
   res.end(JSON.stringify(response));


var databaseUrl = "cmpe280assignment"; // "username:password@example.com/mydb"
var collections = ["users280"]
var db = mongojs(databaseUrl,collections);

db.users280.save({userId: response.userId, email: response.email, password: response.password,  mobile: response.mobile, ques1: response.ques1, ans1: response.ans1, ques2: response.ques2, ans2: response.ans2, address: response.address,interests: response.interests}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})