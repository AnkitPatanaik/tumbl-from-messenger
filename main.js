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
         console.log('hello world');
         api.listen(function callback(err, message) {
                 console.log('HELLO I AM HERE');
                 if(isCommand(message)) {
                         console.log('wya');
                         var commandString = message.body.slice(8);
                         console.log(commandString);
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

//post pictures to tumblr
var options = {
        caption: 'Test',
        source: 'https://i.imgur.com/OBXukWT.jpg',
};

/*
client.createPhotoPost('ankitpancakes', options, function() {
    console.log('successfully posted picture');
});
*/

