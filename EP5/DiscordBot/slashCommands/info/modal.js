const { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder } = require("discord.js");

module.exports = {
    name:"modal",
    description:"Show modal",
    type: ApplicationCommandType.ChatInput,
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String} args
     */
    async run(client, interaction, args){
        let modal = new ModalBuilder()
        .setTitle("Form one")
        .setCustomId("modal")
        .setComponents(
            new ActionRowBuilder()
            .setComponents(
                new TextInputBuilder()
                .setCustomId("value1")
                .setLabel("Value 1")
                .setPlaceholder("Please enter value")
                .setRequired(true)
                .setStyle(TextInputStyle.Short)
            )
        )

        interaction.showModal(modal).catch((e) => {
            console.log(e)

            interaction.reply({
                 content:"Error"
            }).catch(() => {})
        })
    }
}