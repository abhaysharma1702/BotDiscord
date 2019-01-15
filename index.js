const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const request = require('request');

//Weather Configs
var apiKey = config.tokenW;
var cidade = 'Sao Bernardo do Campo';
var urlTemp = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`


//<!------ Lugar pra deixar umas funções que vao ser usadas alguma hora ------>

function addZero(i) {
    if (i < 10) {
        i = "0" + i;           // ---> Gambiarra pra formatar a data e hora do jeito bom
    }
    return i;
}
var d = new Date();
var h = addZero(d.getHours());
var m = addZero(d.getMinutes());    // ---> Gambiarra pra formatar a data e hora do jeito bom
var s = addZero(d.getSeconds());





//<!------ Lugar pra deixar umas funções que vao ser usadas alguma hora ------>


bot.on("error", (e) => console.error(e)); //Se der algum erro, ele mostra o erro no cosole

//Quando o bot logar
bot.on('ready', () => {
    bot.user.setActivity('Digite: #help'); //Seta o que o bot esta jogando
    console.log(">Logado");
});


//Quando alguem entrar no servidor
bot.on("guildMemberAdd", (member) => {
    console.log(member.user.username + " Entrou no serividor");
    bot.channels.get("533835804728885258").send({embed: {
        color: 16711680,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: "Bem Vindo",
        description: "Seja bem-vindo(a) " + member.user.username + " ao nosso Servidor!",
        thumbnail: {
            url: member.user.avatarURL
        },
        fields: [
            {  
            name: "😻",
            value: "Aeeeeeeeeee!!!!"
            }],
        timestamp: new Date(),
      }
    });
});

//Quando sair do servidor
bot.on("guildMemberRemove", (member) => {
    console.log(member.user.username + " Saiu Do Servidor");
    bot.channels.get("533835804728885258").send({embed: {
        color: 16711680,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: "Saiu do Servidor",
        description: "O usúario " + member.user.username + " saiu de nosso servidor!",
        thumbnail: {
            url: member.user.avatarURL
          },
        fields: [
        {
        name: "😿",
        value: "Estou triste"
        }],
        timestamp: new Date(),
      }
    });
});


//Quando Alguem enviar mensagem
bot.on('message', message => {
    var args = message.content.substring(config.prefix.length).split(" "); //Pega os argumentos

    console.log("> [" + message.author.username + "] - " + message.content);

    if(message.author.bot) return; //Se o bot for o autor da msg, ele nao faz nada (retorna)
 

    //#count
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

    //#temperatura
    if(message.content.startsWith(config.prefix + "temperatura")) {

        //Faz o request para a api de weather
        request(urlTemp, function (err, response, body) {
            if(err) {
                console.log('error:', err);
            } else {
                var weather = JSON.parse(body);
                console.log(">Enviando Temperatura");
                
                message.channel.send({embed: {
                    color: 16711680,
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCYmEtOzaBPRfzGMVRrs1BY4hayqsyED7NYmh6CKe-vUEQ1Gt"
                    },
                    fields: [{
                        name: "Temperatura Atual em SBC",
                        value: weather.main.temp + "°"
                      },
                      {
                        name: "Temp Minima",
                        value: weather.main.temp_min + "°"
                      },
                      {
                        name: "Temp Maxima",
                        value: weather.main.temp_max + "°"
                      },
                      {
                        name: "Velocidade do Vento",
                        value: weather.wind.speed + "m/s"
                      },
                      {
                        name: "Umidade",
                        value: weather.main.humidity + "%"
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
    }

    //#Dolar
    if(message.content.startsWith(config.prefix + "dolar")) {
        var urlDolar = 'https://api.hgbrasil.com/finance?format=json&key=a67d9b60';
        request(urlDolar, function (err, response, body){ //faz o request para a api
            if(err) {
                console.log('error', error); //Verifica se deu erro
            } else {
                var data = JSON.parse(body);
                message.channel.send("Valor Atual do Dolar: R$ " + data.results.currencies.USD.buy + "  - [" + h + ":" + m + "]"); //Manda a msg com os valores
            }
        });
    }
    //#smoke
    if(message.content.startsWith(config.prefix + "smoke")) {
        message.channel.send('**BISSSSHES IM SMOKING**').then(async msg => {
            setTimeout(() => {
                msg.edit('🚬');
            }, 500);
            setTimeout(() => {
                msg.edit('🚬 ☁ ');
            }, 1000);
            setTimeout(() => {
                msg.edit('🚬 ☁☁ ');
            }, 1500);
            setTimeout(() => {
                msg.edit('🚬 ☁☁☁ ');
            }, 2000);
            setTimeout(() => {
                msg.edit('🚬 ☁☁');
            }, 2500);
            setTimeout(() => {
                msg.edit('🚬 ☁');
            }, 3000);
            setTimeout(() => {
                msg.edit('🚬 ');
            }, 3500);
            setTimeout(() => {
                msg.edit(`Finished smoking`);
            }, 4000);
        });
    };

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
              },
              {
                name: "#temperatura",
                value: "Envia a temperatura atual" 
              },
              {
                  name: "#dolar",
                  value: "Enviar o valor atual do dolar"
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

