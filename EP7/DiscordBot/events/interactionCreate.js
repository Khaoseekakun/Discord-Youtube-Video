const { ApplicationCommandOptionType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { slashCommands } = require("..");
const client = require("..");

client.on("interactionCreate", async(interaction) => {
    if(interaction.isCommand()){
        if(!interaction.guild) return interaction.reply({
            content:"ไม่สามารถใช้งานในแชทส่วนตัวได้"
        }).catch(() => {})

        const cmd = slashCommands.get(interaction.commandName);
        if(!cmd) return;
        const args = [];
        for(let option of interaction.options.data){
            if(option.type == ApplicationCommandOptionType.Subcommand){
                if(option.name) args.push(option.name);

                option.options?.forEach((x) => {
                    if(x.value) args.push(x.value);
                })
            }
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        try {
            cmd.run(client, interaction, args)  
        } catch (error) {
            console.log(error)
        }
    }
    if(interaction.isButton()){
        if(interaction.customId == "modal"){
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
    if(interaction.isModalSubmit()){
        if(interaction.customId == "modal"){
            let value1 = interaction.fields.getTextInputValue("value1");
            if(!value1) return interaction.reply({content:"โปรดระบุค่า"}).catch(() => {})

            interaction.reply({
                content:`Value 1 = ${value1}`
            }).catch(() => {})
        }
    }
})