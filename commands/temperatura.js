const request = require('request');
const util = require('../util/util.js');
exports.run = async (client, message) => {
    let apiKey = client.config.tokenW;
    let cidade = 'Sao Paulo';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`

    request(url, (err, response, body) => {
        if(err) console.log(err);
        else {
            let weather = JSON.parse(body);

            message.channel.send({embed: {
                color: util.getRandonColor(),
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
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
                }],
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.username,
                },
                timestamp: new Date()
            }});
        }
    });
}