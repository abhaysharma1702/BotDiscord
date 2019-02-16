exports.run = async (client, message, args) => {
    if(parseInt(args[0]) < 1 || args[0] == "" || args[0] == " " || args[0] == null) {
        message.channel.send("Por favor insira um numero :) Ex: *delete 3");
        return;
    }
    if(parseInt(args[0]) > 20) {
        message.channel.send("Insira um numero menor");
        return;
    }
    let number = parseInt(args[0]) + 1;
    message.channel.fetchMessages({limit: number}).then(messages => message.channel.bulkDelete(messages));
}