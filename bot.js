var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

//^\/coolguys$
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/send/; //basically gonna make a large regex

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(request.text);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

//function that will search a dictionary for the right key
function chooseMessage(req){
  //create a dictionary to store all of the faces and the keys
  var dict = {
    '/send':"ya woke bruh"
  };

  //if the req is a key in the dict return the msg
  if(req in dict){
    return dict[req];
  }else{
    return 'its not in our database';
  }






}
function postMessage(requ) {
  var botResponse, options, body, botReq;



  botResponse = chooseMessage(requ);

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;