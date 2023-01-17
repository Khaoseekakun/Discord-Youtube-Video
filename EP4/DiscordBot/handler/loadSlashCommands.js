const { Client } = require("discord.js");
const { slashCommands } = require("..");
const loadFiles = require("../Functions/Filesloader");

/**
 * @param {Client} client 
 */
async function loadSlashCommands(client){
    await slashCommands.clear();

    let commandsArray = [];

    const Files = await loadFiles("slashCommands");

    Files.forEach((files) => {
        const commands = require(files)
        slashCommands.set(commands.name, commands);
        commandsArray.push(commands);
    })

    client.application.commands.set(commandsArray).catch((e) => {
        console.log(e)
    }).then(() => {
        console.log("Slash Commands Loaded");
    })
}

module.exports = loadSlashCommands;