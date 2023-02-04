const { Client } = require("discord.js");
const { events } = require("..");
const loadFiles = require("../Functions/Filesloader");

/**
 * @param {Client} client 
 */
async function loadEvents(client){
    await events.clear();

    const Files = await loadFiles("events");

    Files.forEach((files) => {
        const event = require(files)

        const execute = (...args) => event.execute(...args, client);
        events.set(event.name, execute);

        if(event.rest){
            if(event.once) client.rest.once(event.name, execute);
            else client.rest.on(event.name, execute);
        }else{
            if(event.once) client.on(event.name, execute);
            else client.on(event.name, execute);
        }
    })

    return console.log(`[Loaded Events] ${Files.length} events loaded`)
}

module.exports = loadEvents;