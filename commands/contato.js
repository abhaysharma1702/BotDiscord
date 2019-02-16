const util = require('../util/util.js');
exports.run = async (client, message) => {
    message.channel.send({embed: {
        color: util.getRandonColor(),
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: "Entre em contato comigo :grinning:",
        description: `>Encontrou algum problema? \n>Tem alguma sugestão de comando? \n>Tem alguma duvida? \n>Você pode falar comigo pelo discord <@261991713541718017>`
    }});
}