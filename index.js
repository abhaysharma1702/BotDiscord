const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');


bot.on("error", (e) => console.error(e)); //Se der algum erro, ele mostra o erro no cosole
//Quando o bot logar
bot.on('ready', () => {
    bot.user.setActivity('Digite: #help'); //Seta o que o bot esta jogando
    console.log(">Logado");


});


//Quando Alguem enviar mensagem
bot.on('message', message => {
    var args = message.content.substring(config.prefix.length).split(" "); //Pega os argumentos

    console.log("> [" + message.author.username + "] - " + message.content);

    if(message.author.bot) return; //Se o bot for o autor da msg, ele nao faz nada (retorna)
 

    //Comando de contar
    if (message.content.startsWith(config.prefix  + "count")) {

        var nInformado = args[1];
        if(nInformado >= 10) {
            message.reply("Insira um valor menor");
            return;
        }
        var numeroAtual = 1;

        var si = setInterval(function() {
            if (numeroAtual > nInformado) {
                clearInterval(si);
                message.channel.send("GO !!");
                return;
            }
            message.channel.send(numeroAtual)
            numeroAtual++;
        } ,1000);
    }

    //#help
    if(message.content.startsWith(config.prefix + "help")) {
        message.channel.send({embed: {
            color: 16711680,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            title: "Comandos",
            description: "Lista de comandos do servidor :)",
            fields: [{
                name: "#count",
                value: "Inicia uma contagem ate o valor informado \n Ex. #count 5"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "Pagina 1/1"
            }
          }
        });
    }

});

bot.login(config.token);