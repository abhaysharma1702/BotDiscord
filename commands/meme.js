const request = require('request');
const util = require('../util/util.js');

exports.run = async (client, message) => {
    request("https://api-to.get-a.life/meme", (err, response, body) => {
        if(err) console.log(err);
        else {
            let data = JSON.parse(body);
            message.channel.send({embed: {
                color: util.getRandonColor(),
                title: data.text,
                image: {
                    url: data.url
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