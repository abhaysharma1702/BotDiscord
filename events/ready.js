module.exports = async client => {
    client.user.setActivity(`under maintenance`);
    // client.user.setActivity(`Digite: ${client.config.prefix}help`);
    console.log(`> Bot iniciado em [${client.guilds.size}] servidores`);
}