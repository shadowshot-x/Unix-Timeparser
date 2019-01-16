// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const validator=require('validator');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/timestamp/:date_string',function(req,res){
  
  if(isNaN(req.params.date_string))
    {
      if(validator.isISO8601(req.params.date_string))
        {
         var d = new Date(req.params.date_string);
         var timestamp = Math.round((new Date(req.params.date_string)).getTime() / 1000);
         if (d.getDay()==NaN)
           {res.send({ 'time' : 'Error' });}
         else{
                res.send(
                  {'unix':timestamp,'utc': d.getDay() + ',' + d.getDate() + ' ' + d.getFullYear()+ ' '+ d.getHours()+ d.getMinutes() + d.getSeconds() }
                        );
             }
        }
     else
       {
         res.send({'time':'error'});
       }
    }
  else
    {
      var d = new Date(req.params.date_string*1000);
      var timestamp = Math.round((new Date(req.params.date_string)).getTime() / 1000);
      res.send(
      {'unix':req.params.date_string,'utc': d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() }
               );
    }
});

app.get('/timestamp',function(req,res){
    var d=new Date();
   var timestamp = Math.round((new Date()).getTime() / 1000);
     res.send(
      {
     'unix':timestamp,'utc': d.getDay() + ',' + d.getDate() + ' ' + d.getFullYear()+ ' '+ d.getHours()+ d.getMinutes() + d.getSeconds() }
         );
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
