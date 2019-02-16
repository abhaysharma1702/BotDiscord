exports.run = async (client, message) => {
    if(message.author.id == "261991713541718017") {
        message.reply(client.guilds.size);
        message.reply(`:ping_pong: Pong! **\`${client.pings[0]}ms\` (bot ping)**`);
    }
}