const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');


//Quando o bot logar
bot.on('ready', () => {
    console.log(">Logado");

});


//Quando Alguem enviar mensagem
bot.on('message', message => {

    console.log("> [" + message.author.username + "] - " + message.content);

    
    if(message.author.bot) {
        return;
    }
 
    var cezar = "206304601303941121";
    var marco = "261991713541718017";

    if(message.author.id == cezar) {
        message.channel.send("E o Cezar");
    }

    if(message.author.id == marco) {
        message.channel.send("E o marco");
    }

});

bot.login(config.token);