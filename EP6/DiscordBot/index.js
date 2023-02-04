const {Client, GatewayIntentBits, Collection} = require("discord.js");

require("dotenv").config()

const client = new Client({
    intents:[
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ]
})

module.exports = client;

client.login(process.env.token);

// Collection
client.messageCommands = new Collection();
client.aliase = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();

require("./handler")(client);