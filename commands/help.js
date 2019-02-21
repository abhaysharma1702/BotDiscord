exports.run = async (client, message, args) => {
    if(args[0] == 2) {
        //2° pagina
        message.channel.send({embed: {
            color: 16711680,
            title: ":closed_book: Lista de Comandos 2ª página :closed_book:",
            fields: [
                {
                    name: `${client.config.prefix}votacao <titulo>`,
                    value: "Inicia uma votação \nEx. *votacao Devemos banir fulano do servidor?"
                },
                {
                    name: `${client.config.prefix}delete x`,
                    value: "Deleta as ultimas mensagens da sala \nEx. *delete 5 Deleta as ultimas 5 mensagems"
                },
                {
                    name: `${client.config.prefix}sortear x`,
                    value: "Sorteia um numero de 0 a x \n Ex. *sortear 8 -- Sorteia um numero de 0 a 8"
                },
                {
                    name: `${client.config.prefix}roleta`,
                    value: "Morra ou Sobreviva"
                },
                {
                    name: `${client.config.prefix}dog`,
                    value: "Envia uma foto aleatória de um cachorro"
                },
                {
                    name: `${client.config.prefix}dolar`,
                    value: "Envia o valor atual do dolar"
                },
                {
                    name: `${client.config.prefix}github`,
                    value: "Repositório do bot no GitHub :)"
                },
                {
                    name: `${client.config.prefix}password`,
                    value: "Gera uma senha aleatória"
                }],
            footer: {
                    icon_url: client.user.avatarURL,
                    text: `Pagina 1/2 Para a ver a 2ª pagina digite ${client.config.prefix}help 2`
                },
            timestamp: new Date(),
        }});
    }
    else {
        //1° pagina
        message.channel.send({embed: {
            color: 16711680,
            title: ":closed_book: Lista de Comandos :closed_book:",
            fields: [{
                name: `${client.config.prefix}contato`,
                value: "Bugs, Criticas ou Sugestões? Entre em contato comigo :)"
            },
            {
                name: `${client.config.prefix}charada`,
                value: "Envia uma charada aleatória"
            },
            {
                name: `${client.config.prefix}count`,
                value: "Inicia uma contagem até 3"
            },
            {
                name: `${client.config.prefix}temperatura`,
                value: "Envia a temperatura atual"
            },
            {
                name: `${client.config.prefix}smoke`,
                value: "Faz o bot fumar"
            },
            {
                name: `${client.config.prefix}meme`,
                value: "Envia um meme aleatório"
            },
            {
                name: `${client.config.prefix}tradutor`,
                value: "Traduz o texto informado para o português \n Ex. *tradutor Dog"
            },
            {
                name: `${client.config.prefix}cat`,
                value: "Envia uma foto aleatória de um gato"
            }],
        footer: {
            icon_url: client.user.avatarURL,
            text: "Pagina 1/2 Para a ver a 2ª pagina digite *help 2"
        },
        timestamp: new Date()
        }});
    }
}