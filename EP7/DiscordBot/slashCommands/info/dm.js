const { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name:"dm",
    description:"DM a user",
    type: ApplicationCommandType.ChatInput,
    options:[
        {
            name:'user',
            type: ApplicationCommandOptionType.User,
            description:"select user for dm",
            required:true,
        },{
            name: "message",
            type:ApplicationCommandOptionType.String,
            description:"Message to send",
            required:true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String} args
     */
    async run(client, interaction, args){
        let user = interaction.options.getUser("user")
        let message = interaction.options.get("message").value

        if(!user) return interaction.reply({
            content:"โปรดระบุผู้ใช้",
        }).catch((e) => {
            console.log(e)
        })

        if(!message) return interaction.reply({
            content:"โปรดระบุข้อความ",
        }).catch((e) => {
            console.log(e)
        })

        user.send({
            content:message
        }).catch((e) => {
            console.log(e)
            interaction.reply({
                content:"ไม่สามารถส่งข้อความไปยังผู้ใช้งานได้"
            }).catch((e) => {})
        }).then(() => {
            interaction.reply({
                content:"ส่งข้อความแล้ว"
            }).catch((e) => {})
        })
    }
}
