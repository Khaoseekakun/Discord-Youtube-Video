
const client = require("..");

client.on('ready', () => {
    console.log(`${client.user.username} Ready!`);
})