const request = require('request');
const util = require('../util/util.js');

exports.run = async (client, message) => {
    request("https://api-to.get-a.life/catimg", (err, response, body) => {
        if(err) console.log('error', err);
        else {
            let data = JSON.parse(body);
            message.channel.send({embed: {
                color: util.getRandonColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                image: {
                    url: data.link
                },
                footer: {
                    text: "🐱"
                },
                timestamp: new Date()
            }});
        }
    });
}