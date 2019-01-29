const Discord = require('discord.js');
const bot = new Discord.Client(); // Bot
const config = require('./config.json');
const request = require('request'); //biblioteca para request
const translate = require('@vitalets/google-translate-api'); //api do google tradutor

//Weather Configs
let apiKey = config.tokenW;
let cidade = 'Sao Paulo';
let urlTemp = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`


//<!------ Lugar pra deixar umas funções que vao ser usadas alguma hora ------>

function addZero(i) {
    if (i < 10) {
        i = "0" + i;           // ---> Gambiarra pra formatar a data e hora do jeito bom
    }
    return i;
}


function CorRandon() {
    return Math.floor(Math.random() * 9999999);  // ---> Gera uma cor aleatorio para usar nos embed's
}



//<!------ Lugar pra deixar umas funções que vao ser usadas alguma hora ------>


bot.on("error", (e) => console.error(e)); //Se der algum erro, ele mostra o erro no cosole

//Quando o bot logar
bot.on('ready', () => {
    bot.user.setActivity('Digite: *help'); //Seta o que o bot esta jogando
    console.log(">Logado");
});


//Quando alguem entrar no servidor
bot.on("guildMemberAdd", (member) => {
    let corDoEmbed = Math.floor(Math.random() * 9999999); //Gera uma cor aleatoria para o embed
    console.log(member.user.username + " Entrou no serividor");
    bot.channels.get("533835804728885258").send({embed: {
        color: corDoEmbed,
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
    let corDoEmbed = Math.floor(Math.random() * 9999999); //Gera uma cor aleatoria para o embed
    bot.channels.get("533835804728885258").send({embed: {
        color: corDoEmbed,
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

    let d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());    // Cada vez que alguem manda msg atualiza a data
    let s = addZero(d.getSeconds());


    let args = message.content.substring(config.prefix.length).split(" "); //Pega os argumentos

    console.log("> [" + message.author.username + "] - " + message.content);

    if(message.author.bot) return; //Se o bot for o autor da msg, ele nao faz nada (retorna)
 
    //*ping
    if(message.content.startsWith(config.prefix + "ping")) {
        message.channel.send(`:ping_pong: Pong! **\`${bot.pings[0]}ms\`**`)
    }
    //*github
    if(message.content.startsWith(config.prefix + "github")) 
        message.channel.send("https://github.com/marcopandolfo/BotDiscord");

    //*atm
    if(message.content.startsWith(config.prefix + "atm")) {
        console.log("Servidores => " + bot.guilds.size);
    }

    //*delete
    if(message.content.startsWith(config.prefix + "delete")) {
        if(parseInt(args[1]) < 1 || args[1] == "" || args[1] == " " || args[1] == null) {
            message.channel.send("Por favor insira um numero :) Ex: *delete 3");
            return;
        }
        if(parseInt(args[1]) > 15) {
            message.channel.send("Insira um numero menor");
            return;
        }
        let number = parseInt(args[1]) + 1;
        message.channel.fetchMessages({limit: number}).then(messages => message.channel.bulkDelete(messages));
    }


    //*password
    if(message.content.startsWith(config.prefix + "password")) {
        request("http://www.sethcardoza.com/api/rest/tools/random_password_generator/", function (err, response, body){ //faz o request para a api
            if(err) {
                console.log('error', error); //Verifica se deu erro
            } else {
                message.channel.send({embed: {
                    color: CorRandon(),
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    title: "Senha Gerada",
                    description: body
                  }
                });
            }
        });
    }

    //*count
    if (message.content.startsWith(config.prefix  + "count")) {
        let numeroAtual = 1;

        let si = setInterval(function() {
            if (numeroAtual > 3) {
                clearInterval(si);
                message.channel.send("GO !!");
                return;
            }
            message.channel.send(numeroAtual);
            numeroAtual++;
        } ,1000);
    }

    //*sortear
    if(message.content.startsWith(config.prefix + "sortear")) {
        if(args[1] == null || args[1] == " ") {
            message.channel.send("Por favor insira um numero maximo Ex. *sortear 10");
            return;
        }
        let numeroMaximo = args[1];  //Pega o numero que a pessoa passou
        let numeroSorteado = Math.floor(Math.random() * numeroMaximo + 1); //Sorteia

        message.reply(numeroSorteado);
    }

    //*cat 
    if(message.content.startsWith(config.prefix + "cat")) {
        request("https://api-to.get-a.life/catimg", function (err, response, body){ //faz o request para a api
            if(err) {
                console.log('error', error); //Verifica se deu erro
            } else {
                let data = JSON.parse(body);
                
                message.channel.send({embed: {
                    color: CorRandon(),
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    image: {
                        url: data.link
                    },
                    footer: {
                        text: "🐱"
                    },
                    timestamp: new Date(),
                  }
                });
            }
        });
    }



    //*dog
    if(message.content.startsWith(config.prefix + "dog")) {
        request("https://dog.ceo/api/breeds/image/random", function (err, response, body){ //faz o request para a api
            if(err) {
                console.log('error', error); //Verifica se deu erro
            } else {
                let data = JSON.parse(body);
                
                message.channel.send({embed: {
                    color: CorRandon(),
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    image: {
                        url: data.message
                    },
                    footer: {
                        text: "🐶"
                    },
                    timestamp: new Date(),
                  }
                });
            }s
        });
    }

    //*translate
    if(message.content.startsWith(config.prefix + "tradutor")) {
        let command = "tradutor";
        let txt = message.content.slice(config.prefix.length + command.length + 1); //Pegando da msg o texto pra traduzir
        
        translate(txt, {to: 'pt'})
        .then(res => {
            message.channel.send({embed: {
                color: CorRandon(),
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                title: "Tradução:",
                description: res.text,
                thumbnail: {
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Translate_logo.svg/250px-Google_Translate_logo.svg.png"
                },
                footer: {
                    icon_url: "",
                    text: `Traduzido do [${res.from.language.iso}]`
                },
                timestamp: new Date(),
              }
            });


        }).catch(err => {
            console.error(err);
        });
    }

    //*temperatura
    if(message.content.startsWith(config.prefix + "temperatura")) {

        //Faz o request para a api de weather
        request(urlTemp, function (err, response, body) {
            if(err) {
                console.log('error:', err);
            } else {
                let weather = JSON.parse(body);
                console.log(">Enviando Temperatura");
                
                message.channel.send({embed: {
                    color: 16768768,
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCYmEtOzaBPRfzGMVRrs1BY4hayqsyED7NYmh6CKe-vUEQ1Gt"
                    },
                    fields: [{
                        name: "Temperatura Atual em SP",
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

    //*Dolar
    if(message.content.startsWith(config.prefix + "dolar")) {
        let urlDolar = 'https://api.hgbrasil.com/finance?format=json&key=a67d9b60';
        request(urlDolar, function (err, response, body){ //faz o request para a api
            if(err) {
                console.log('error', error); //Verifica se deu erro
            } else {
                let data = JSON.parse(body);
                message.channel.send("Valor Atual do Dolar: R$ " + data.results.currencies.USD.buy + "  - [" + h + ":" + m + "]"); //Manda a msg com os valores
            }
        });
    }

    //*meme
    if(message.content.startsWith(config.prefix + "meme")) {
        request("https://api-to.get-a.life/meme", function (err, response, body){ //faz o request para a api
            if(err) {
                console.log('error', error); //Verifica se deu erro
            } else {
                let data = JSON.parse(body);

                message.channel.send({embed: {
                    color: CorRandon(),
                    author: {
                      name: bot.user.username,
                      icon_url: bot.user.avatarURL
                    },
                    title: data.text,
                    image: {
                        url: data.url
                    },
                    timestamp: new Date(),
                  }
                });
            }
        });
    }


    //*smoke
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

    //*help
    if(message.content.startsWith(config.prefix + "help")) {
        if(args[1] == 2) {
            //2 pag do help
            message.channel.send({embed: {
                color: 16711680,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                title: "Comandos 2ª pagina",
                description: "Lista de comandos do servidor :)",
                fields: [{
                    name: "*delete x",
                    value: "Deleta as mensagems da sala \nEx. *delete 5 > Deleta as ultimas 5 mensagems"
                  },
                  {
                    name: "*empy",
                    value: "empy"
                  },
                  {
                    name: "*github",
                    value: "Repositório do bot no GitHub :)"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Pagina 1/2 Para a ver a 2ª pagina digite *help 2"
                }
              }
            });
        } else { //pag 1 do help
            message.channel.send({embed: {
                color: 16711680,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                title: "Comandos",
                description: "Lista de comandos do servidor :)",
                fields: [{
                    name: "*count",
                    value: "Inicia uma contagem até 3"
                  },
                  {
                    name: "*temperatura",
                    value: "Envia a temperatura atual"
                  },
                  {
                    name: "*dolar",
                    value: "Enviar o valor atual do dolar"
                  },
                  {
                    name: "*smoke",
                    value: "Faz o bot fumar"
                  },
                  {
                    name: "*meme",
                    value: "Envia um meme aleatorio :)"
                  },
                  {
                    name: "*tradutor",
                    value: "Traduz o texto informado para o português \n Ex. *tradutor Dog"
                  },
                  {
                    name: "*cat",
                    value: "Envia uma foto aleatória de um gato"
                  },
                  {
                    name: "*dog",
                    value: "Envia a foto aleatória de um cachorro"
                  },
                  {
                    name: "*sortear x",
                    value: "Sorteia um numero de 0 a x \n Ex. *sortear 8 -- Sorteia um numero de 0 a 8"
                  },
                  {
                    name: "*password",
                    value: "Gera uma senha aleatória"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Pagina 1/2 Para a ver a 2ª pagina digite *help 2"
                }
              }
            });
        }
    }
});

bot.login(config.token);

