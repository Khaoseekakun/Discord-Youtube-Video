const { CommandInteraction, GuildMember } = require("discord.js");
const { manager } = require("..");
const { failReturn, successReturn } = require("./InteractionReply");


module.exports = class Music {
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {String} query 
     */
    static async InteractionQueryMusic(interaction, query){
        /**
         * @type {GuildMember}
         */
        let member = interaction.member
        if(!member) return failReturn(interaction, true, "บอทไม่พบสมาชิกที่สั่งเปิดเพลง")
        if(!member.voice.channel) return failReturn(interaction, true, "คุณไม่ได้อยู่ในห้องเสียง")
        if((interaction.guild.members.me.voice.channel) && member.voice.channelId !== interaction.guild.members.me.voice.channelId) return failReturn(interaction, true, "คุณไม่ได้อยู่ในห้องเดียวกับบอท")

        let player = await manager.create({
            guild: interaction.guildId,
            textChannel: interaction.channelId,
            voiceChannel: member.voice.channelId,
            selfDeafen: true,
        })

        let song =  await player.search(query, member.user)

        if(song.loadType == "LOAD_FAILED") return failReturn(interaction, true, "ไม่สามารถค้นหาเพลงได้")
        if(song.loadType == "NO_MATCHES") return failReturn(interaction, true, "ไม่พบเพลงที่ค้นหา")
        else{
            if(song.loadType == "PLAYLIST_LOADED"){
                player.queue.add(song.tracks)

                if(!player.playing){
                    player.connect()
                }

                if(!player.playing && !player.paused && !player.queue.size){
                    player.play()
                }

                successReturn(interaction, true, `ระบบได้เพิ่มเพลลิสต์ ${song.playlist.name} เข้าไปยังคิวแล้ว`)
            }else{
                player.queue.add(song.tracks[0])

                if(!player.playing){
                    player.connect()
                }

                if(!player.playing && !player.paused && !player.queue.size){
                    player.play()
                }

                successReturn(interaction, true, `ระบบได้เพิ่มเพลง ${song.tracks[0].title} เข้าไปยังคิวแล้ว`)
            }
        }

    }
}