var config = require('config');
var login = require('facebook-chat-api');
var tumblr = require('tumblr.js');
var OAuth = require('oauth');

//tumblr credentials
var client = tumblr.createClient({
        consumer_key: config.get('consumerKey'),
        consumer_secret: config.get('consumerSecret'),
        token: config.get('token'),
        token_secret: config.get('tokenSecret')
});

//login with facebook 
login({
        email: config.get('fbUsername'), 
        password: config.get('fbPassword')
    }, loginCallback);

//helpers below
function loginCallback(err, api) {
        if(err) return console.error(err);
        api.setOptions({selfListen: true});
        api.listen(function callback(err, message) {
                if(isCommand(message)) {
                        var commandString = message.body.slice(8);
                        console.log(commandString);
                        var cmdArray = commandString.split(',');
                        var imgURL = cmdArray[0];
                        var caption = cmdArray[1];
                        console.log(imgURL);
                        console.log(caption);
                        
                        //post pictures to tumblr
                        var options = {
                            caption: caption,
                            source: imgURL,
                        };

                        client.createPhotoPost('ankitpancakes', options, function() {
                            console.log('successfully posted picture');
                        });
                 }
         });
}

//checks if message is a command aka starts with slash
function isCommand(message) {
        if (!(message && message.body)) {
             return false;
         } else {
             //return true if starts with slash    
             return message.body.startsWith('/tumblr');
         }
}
