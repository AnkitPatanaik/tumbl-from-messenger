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

//starts listening for a command 
function loginCallback(err, api) {
    if(err) return console.error(err);
    //so that you read your own messages
    api.setOptions({selfListen: true});
    api.listen(function callback(err, message) {
        console.log(message);
        if(isCommand(message) && message.senderID == config.get('messengerID')) {
            var commandString = message.body.slice(8);
            var cmdArray = commandString.split(',');
            
            var imgURL = cmdArray[0];
            var caption = cmdArray[1];
            
            //post pictures to tumblr
            var options = {
                caption: caption,
                source: imgURL,
            };

            client.createPhotoPost(config.get('tumblrUsername'), options, function() {
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
