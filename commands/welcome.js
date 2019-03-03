const util = require('../util/util.js')
exports.run = async (client, message, args) => {
    
    if (args[0] == null) return message.reply(`Você deve inserir o ID do canal \nEx. ${client.config.prefix}welcome 123456789123456`);

    const id = args[0].replace("<", "").replace(">", "").replace("#", "");

    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(":x: Você não tem permissão para usar esse comando");
    
    
    message.channel.send(util.setWelcomeChat(message.member.guild, id));
    
};