const { Client } = require("discord.js");
const {glob} = require("glob");
const {promisify} = require("util");
const { messageCommands, slashCommands } = require("..");
const loadEvents = require("./loadEvents");
const proGlob = promisify(glob);

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
    const arryMessgaeCommands = [];
    const messageCommand = await proGlob("./messageCommands/**/*.js");
    for(const files of messageCommand){
        const command = require(`.${files}`);
        arryMessgaeCommands.push(command);
        messageCommands.set(command.name, command)
        console.log("[load messageCommands] " + command.name)
    }

    
    const arrySlashCommands = [];
    const slashCommand = await proGlob("./slashCommands/**/*.js");
    for(const files of slashCommand){
        const command = require(`.${files}`);
        arrySlashCommands.push(command);
        slashCommands.set(command.name, command)
        console.log("[load slashCommands] " + command.name)
    }

    loadEvents(client);

    client.on("ready", () => {
        client.application.commands.set(arrySlashCommands).catch((e) => {
            console.log(e)
        }).then(() => {
            console.log("Slash Commands Loaded");
        })
    });
}