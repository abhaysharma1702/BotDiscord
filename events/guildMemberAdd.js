const util = require('../util/util.js');
module.exports = async (client, member) => {

    let corDoEmbed = util.getRandonColor();

    let channel_id = util.getWelcomeChat(member.guild);
    let channel = client.channels.get(channel_id);

    //Mandar DM para a pessoa que entrou
    member.send({embed: {
        color: corDoEmbed,
        author: {
            name: client.username,
            icon_url: client.user.avatarURL
        },
        title: "Bem vindo ao servidor :)",
        description: "Seja bem-vindo(a) " + member.user.username + " ao nosso Servidor! \nDigite *help para ver a lista de comandos =D \nTem alguma sugestão de comando? Mande no meu discord ! <@261991713541718017>",
        timestamp: new Date()
    }});

    //Mostrar que a pessoa entrou no sv
    channel.send({embed: {
        color: corDoEmbed,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: ":tada: Bem Vindo :tada:",
        description: `Olá ${member} Seja bem-vindo(a) ao nosso servidor !`,
        thumbnail: {
            url: member.user.avatarURL
        },
        fields: [
            {
                name: "😻",
                value: "Aeeeeeeeeee!!!!"
            }
        ],
        timestamp: new Date()
    }});
}