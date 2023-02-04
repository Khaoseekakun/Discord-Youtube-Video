const { CommandInteraction, EmbedBuilder } = require("discord.js");


module.exports = class InteractionReply {
    /**
     * @param {CommandInteraction} interaction 
     * @param {Boolean} ephemeral 
     * @param {String} message 
     */
    static async failReturn(interaction, ephemeral = false, message){

        let embeds = new EmbedBuilder()
        .setAuthor({
            iconURL:"https://cdn-icons-png.flaticon.com/512/190/190406.png",
            name:message
        }).setColor("Red")
        .setTimestamp()

        interaction.reply({
            embeds:[embeds],
            ephemeral:ephemeral
        }).catch(() => {
            interaction.reply({
                content:message,
            }).catch((e) => {
                console.log(e)
            })
        })

    }
    
    /**
     * @param {CommandInteraction} interaction 
     * @param {Boolean} ephemeral 
     * @param {String} message 
     */
    static async successReturn(interaction, ephemeral = false, message){

        let embeds = new EmbedBuilder()
        .setAuthor({
            iconURL:"https://cdn-icons-png.flaticon.com/512/190/190411.png",
            name:message
        }).setColor("Green")
        .setTimestamp()

        interaction.reply({
            embeds:[embeds],
            ephemeral:ephemeral
        }).catch(() => {
            interaction.reply({
                content:message,
            }).catch((e) => {
                console.log(e)
            })
        })

    }
}