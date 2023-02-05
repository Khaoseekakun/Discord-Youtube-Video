const { CommandInteraction } = require("discord.js");
const { failReturn, successReturn } = require("./InteractionReply");


module.exports = class Music {
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {String} query 
     */
    static async InteractionQueryMusic(interaction, query){
        if(!query) return failReturn(interaction, true, "โปรดระบุชื่อเพลงที่ต้องการค้นหา")
        return successReturn(interaction, true, `เพลงที่คนหาคือ : ${query}`)
    }
}