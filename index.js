const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const config = require('./config.json');
const client = new Discord.Client();
const sqlite3 = require('sqlite3').verbose();
client.config = config;

client.db = new sqlite3.Database('db/charadas.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('[Connected to the database.]');
});


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`> Carregando comando:  [${commandName}]`);
        client.commands.set(commandName, props);
    });
});

client.on('error', error => {
    console.log(error);
});

client.login(config.token);