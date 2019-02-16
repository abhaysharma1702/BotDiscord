exports.run = async (client, message) => {
    message.channel.send(`:ping_pong: Pong! **\`${client.pings[0]}ms\` (bot ping)**`);
}