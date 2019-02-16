const util = require('../util/util.js');
exports.run = async (client, message) => {
    let randomId = Math.floor((Math.random() * 1816) + 1);
    client.db.get(`SELECT * FROM charadas WHERE id='${randomId}'`, (err, result) => {
        if(err) console.log(err);
        else {
            message.channel.send({embed: {
                color: util.getRandonColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Charada",
                description: `${result.pergunta} \n ${result.resposta}`
            }});
        }
    });
}