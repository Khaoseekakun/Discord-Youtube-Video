const {Client, GatewayIntentBits, Collection} = require("discord.js");

const {Manager} = require("erela.js")

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


let manager = new Manager({
    nodes:[
        {
            host: "127.0.0.1",
            password:"Sinsamuth",
            port: 2333
        }
    ],
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
});

manager.on("nodeConnect", () => {
    console.log("Node is conenceted")
})

manager.on("nodeDisconnect", (node) => {
    setTimeout(() => {
        node.connect()
    }, 10000)
})

client.manager = manager;

client.login(process.env.token);

// Collection
client.messageCommands = new Collection();
client.aliase = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();

require("./handler")(client);