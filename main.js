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

var options = {
        caption: 'Test',
        source: 'https://i.imgur.com/OBXukWT.jpg',
};
client.createPhotoPost('ankitpancakes', options, function() {
    console.log('successfully posted picture');
});

//login with facebook 
login({
        email: config.get('fbUsername'), 
        password: config.get('fbPassword')
    }, loginCallback);

function loginCallback(){
        console.log("helloworld");
}

