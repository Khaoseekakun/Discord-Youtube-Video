const { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { InteractionQueryMusic } = require("../../ClassFunction/Music");

module.exports = {
    name:"play",
    description:"play music",
    type: ApplicationCommandType.ChatInput,
    options:[{
            name: "name",
            type:ApplicationCommandOptionType.String,
            description:"enter name music",
            required:true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String} args
     */
    async run(client, interaction, args){
        let name = interaction.options.get("name").value
        InteractionQueryMusic(interaction, name)
    }
}