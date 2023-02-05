const { EmbedBuilder, TextChannel } = require("discord.js");
const client = require("..");
const { manager } = require("..");

manager.on("trackStart", (player, track) => {
    /**
     * @type {TextChannel}
     */
    let textChannel = client.channels.cache.get(player.textChannel)
    if(!textChannel) return player.destroy()

    let Embeds = new EmbedBuilder()
    .setAuthor({
        name:`กำลังเล่นเพลง ${track.title}`
    }).setThumbnail(track.thumbnail)
    .setColor("Green")

    textChannel.send({
        embeds:[Embeds]
    }).catch((e) => {
        console.log(e)
    })
}).on("trackEnd", (player, track) => {

    /**
     * @type {TextChannel}
     */
    let textChannel = client.channels.cache.get(player.textChannel)
    if(!textChannel) return player.destroy()

    let Embeds = new EmbedBuilder()
    .setAuthor({
        name:`เพลง ${track.title} ได้จบลงแล้ว`
    }).setThumbnail(track.thumbnail)
    .setColor("Red")

    textChannel.send({
        embeds:[Embeds]
    }).catch((e) => {
        console.log(e)
    })
}).on("queueEnd", (player, track) => {
    /**
     * @type {TextChannel}
     */
    let textChannel = client.channels.cache.get(player.textChannel)
    if(!textChannel) return player.destroy()

    let Embeds = new EmbedBuilder()
    .setAuthor({
        name:`คิวเพลงหมดลงแล้ว`
    })
    .setColor("Red")

    textChannel.send({
        embeds:[Embeds]
    }).catch((e) => {
        console.log(e)
    })

    return player.destroy()
})