const { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name:"info",
    description:"Get info about the bot",
    type: ApplicationCommandType.ChatInput,
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String} args
     */
    async run(client, interaction, args){

        let actionRow = new ActionRowBuilder()
        .setComponents(
            new ButtonBuilder()
            .setCustomId("modal")
            .setLabel("Modal")
            .setStyle(ButtonStyle.Success)
        )


        interaction.reply({
            content:`MemberName`,
            components: [actionRow]
        }).catch((e) => {
            console.log(e)
        })

    }
}