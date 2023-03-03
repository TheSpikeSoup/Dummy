const { SlashCommandBuilder, EmbedBuilder, Attachment } = require('discord.js');
const Tesseract = require('tesseract.js');
const { createWorker } = require('tesseract.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ocr')
    .setDescription('Usa tesseract.js para extraer el texto de una imagen')
    .addAttachmentOption(option => 
        option.setName('imagen')
        .setDescription('La imagen la cual le quieres extraer el texto')
        .setRequired(true)),
    async execute(interaction) {
        interaction.reply({embeds: [new EmbedBuilder()
            .setColor('#FFFF00')
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
            .setFooter({ text: "Dummy || Optical Character Recognition", iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
            .setTitle('<a:Prints_dark:1069368188707545170>  || Cargando...')]})
        const Attachment = interaction.options.getAttachment("imagen")
        if (Attachment.contentType.startsWith("image")) {
            const worker = await createWorker();
            (async () => {
               await worker.loadLanguage('eng');
               await worker.initialize('eng');
                let { data: { text } } = await worker.recognize(Attachment.url);
                if (text === "") {
                    text = "No se encontro texto :Bv"
                }
                await interaction.editReply({embeds: [new EmbedBuilder()
                 .setColor('#FFFF00')
                 .setThumbnail(Attachment.url)
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                 .setFooter({ text: "Dummy || Optical Character Recognition", iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                 .setTitle("Texto extraído de la imagen:")
                 .setDescription(text)]})
                await worker.terminate();
              })(); 
            
        } else {
            await interaction.editReply({embeds: [new EmbedBuilder()
                .setColor('#FFFF00')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                .setFooter({ text: "Dummy || Optical Character Recognition", iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                .setTitle('Por favor proporciona una imagen :nerd: :point_up')]})
            return
        }
    }
}