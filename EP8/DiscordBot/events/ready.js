
const { manager } = require("..");
const client = require("..");


client.on('ready', () => {
    console.log(`${client.user.username} Ready!`);
    manager.init(client.user.id)
})