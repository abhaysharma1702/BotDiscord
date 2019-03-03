const db = require('sqlite-sync');
db.connect('db/welcome.sqlite');

exports.getRandonColor = () => {
    return Math.floor(Math.random() * 9999999);
}
exports.getDefaultChannel = (guild) => {
    try {
        // get "original" default channel
        if(guild.channels.has(guild.id))
        return guild.channels.get(guild.id)
        
        // Check for a "general" channel, which is often default chat
        const generalChannel = guild.channels.find(channel => channel.name === "general" || channel.name === "geral");
        if (generalChannel)
        return generalChannel;
        // Now we get into the heavy stuff: first channel in order where the bot can speak
        // hold on to your hats!
        return guild.channels
        .filter(c => c.type === "text" &&
        c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
        .sort((a, b) => a.position - b.position ||
        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
        .first();
        
    } catch (error) {
        console.log(error);
    }
}

exports.getWelcomeChat = guild => {

    const getDefaultChannel = guild => {
        // get "original" default channel
        if(guild.channels.has(guild.id))
        return guild.channels.get(guild.id)
        
        // Check for a "general" channel, which is often default chat
        const generalChannel = guild.channels.find(channel => channel.name === "general" || channel.name === "geral");
        if (generalChannel)
        return generalChannel;
        // Now we get into the heavy stuff: first channel in order where the bot can speak
        // hold on to your hats!
        return guild.channels
        .filter(c => c.type === "text" &&
        c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
        .sort((a, b) => a.position - b.position ||
        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
        .first();
    }


    try {
        let id = guild.id;
        let query = "undefined";
        db.run(`SELECT channel_id FROM welcome WHERE guild_id=${id}`, (res) => {
            if(res.error) {
                throw res.error;
            }
    
            if(res != 'undefined' && res != null && res.length > 0){        
                query = res[0].channel_id;
            }
        });

        if(query == "undefined") {       
            return getDefaultChannel(guild).toString().replace("<", "").replace(">", "").replace("#", "");
        }

        return query;
    } catch (error) {
        console.log(error);
    }
}
exports.setWelcomeChat = (guild, id) => {
    try {
        const result = db.run(`INSERT INTO welcome (guild_id, channel_id) VALUES (${guild.id}, ${id})`);
        if(result.error) {
            db.run(`UPDATE welcome SET channel_id=${id} where guild_id=${guild.id}`);
            return ':white_check_mark: Canal de mensagens de boas vindas atualizado com sucesso!';
        } else {
            return ":white_check_mark: Agora o bot irá mandar as mensagens de boas vindas nesse canal :)"
        }
    } catch (error) {
        console.log(error);
    }
}