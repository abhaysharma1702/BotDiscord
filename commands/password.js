const request = require('request');
const util = require('../util/util.js');

exports.run = async (client, message, args) => {
    request("http://www.sethcardoza.com/api/rest/tools/random_password_generator/", (err, response, body) => {
        if(err) console.log('error', err);
        else {
            message.channel.send({embed: {
                color: util.getRandonColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Senha Gerada:",
                description: body,
                thumbnail: {
                    url: "https://cdn4.iconfinder.com/data/icons/basic-app/1000/BASICAPP_1-39-512.png"
                },
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.username,
                },
                timestamp: new Date()
            }});
        }
    });
}