const Booru = require('@himeka/booru')
const { Post } = require('@himeka/booru')
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const { nanoid } = require("nanoid");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('booru')
		.setDescription('Boorus')
        
        .addSubcommand(subcommand =>
            subcommand
                .setName('rule34')
                .setDescription('Busca en rule34.xxx')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('aibooru')
                .setDescription('Busca en aibooru.online')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('atfbooru')
                .setDescription('Busca en booru.allthefallen.moe')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('3dbooru')
                .setDescription('Busca en behoimi.org')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('danbooru')
                .setDescription('Busca en danbooru.donmai.us')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('derpibooru')
                .setDescription('Busca en derpibooru.org')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('e621')
                .setDescription('Busca en e621.net')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('e926')
                .setDescription('Busca en e926.net')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('gelbooru')
                .setDescription('Busca en gelbooru.com')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('hypnohub')
                .setDescription('Busca en hypnohub.net')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('konac')
                .setDescription('Busca en konachan.com')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('konan')
                .setDescription('Busca en konachan.net')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('lolibooru')
                .setDescription('Busca en lolibooru.moe')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('paheal')
                .setDescription('Busca en rule34.paheal.net')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('realbooru')
                .setDescription('Busca en realbooru.com')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('safebooru')
                .setDescription('Busca en safebooru.org')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('sakugabooru')
                .setDescription('Busca en www.sakugabooru.com')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tbib')
                .setDescription('Busca en tbib.org')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('xbooru')
                .setDescription('Busca en xbooru.com')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('yandere')
                .setDescription('Busca en yande.re')
                .addStringOption(option => 
                    option.setName('tags')
                    .setDescription('Tags, si quieres más de uno separalos por ", "')
                    .setRequired(true)
                )
                .addBooleanOption(option =>
                    option.setName('random')
                        .setDescription('Debería el resultado ser random?')
                ),
                ),
                
            
                
	async execute(interaction) {
        async function BooruSearch(Site, URL) {

            let idn = `${nanoid()}`;
            const row = new ActionRowBuilder()
            .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`primary-${idn}`)
                        .setEmoji('1066434175097384960')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId(`foward-${idn}`)
                        .setEmoji('1066434177601392760')
                        .setStyle(ButtonStyle.Primary)
                    
            );
            const row1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`primary-${idn}`)
                        .setEmoji('1066434175097384960')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`foward-${idn}`)
                        .setEmoji('1066434177601392760')
                        .setStyle(ButtonStyle.Primary)
            )
            const row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`primary-${idn}`)
                        .setEmoji('1066434175097384960')
                        .setStyle(ButtonStyle.Primary),
                    new ButtonBuilder()
                        .setCustomId(`foward-${idn}`)
                        .setEmoji('1066434177601392760')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true)
                )
            const row3 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`primary-${idn}`)
                        .setEmoji('1066434175097384960')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setCustomId(`foward-${idn}`)
                        .setEmoji('1066434177601392760')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true)
                )
        
            let num = 0
            let id = []
            let postView = []
            let fileUrl = []
            let score = []
            let rating = []
            let source = []
            let createdAt = []
            let tags = []
            let preview = []
            let titlem = []
    
            function formatPost(post) {
                if (post.fileExt == "mp4") {
                    titlem.push("Post del video")
                    fileUrl.push(post.previewUrl)
                } else {
                    titlem.push("Post de la imagen")
                    fileUrl.push(post.fileUrl)
                }
                  id.push(post.id),
                  postView.push(post.postView),
    
                  score.push(post.score),
                  rating.push(post.rating),
                  source.push(`${post.source}`),
                  createdAt.push(post.createdAt),
                  tags.push(post.tags)
                  return id, postView, fileUrl, score, rating, source, createdAt, tags
              }
    
              
              if (interaction.channel.nsfw) {
                interaction.reply({ embeds: [new EmbedBuilder()
                  .setColor('#FFFF00')
                  .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                  .setFooter({ text: URL, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                  .setTitle('<a:Prints_dark:1069368188707545170>  || Buscando...')] })
                Booru.search(Site, interaction.options.getString('tags').split(", "), { limit: 100, random: interaction.options.getBoolean("random") })
                 .then(async (posts) => {
                   if (posts.length === 0) {
                        await wait(1000)
                        await interaction.editReply({ embeds: [new EmbedBuilder()
                            .setColor('#FFFF00')
                            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                            .setFooter({ text: URL, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                            .setTitle("No se encontro nada Bv")]})
                   } else {
    
                       console.log(`Found ${posts.length} image${posts.length === 1 ? '' : 's'}.`)
                       for (let post of posts) {
                            formatPost(post)
                        }
        
                        function BuildEmbed(i) {
                            const date = new Date(createdAt[i]);
                            const year = date.getFullYear();
                            const month = date.getMonth();
                            const day = date.getDate();
                            const newDate = new Date(year, month, day);
                            const fecha = newDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                            if (fecha == "Invalid Date") {
                                fecha = "No se pudo obtener la fecha de subida"
                            }
                            var Build = new EmbedBuilder()
                                .setColor('#FFFF00')
                                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL(), url: `https://discord.com/users/${interaction.user.id}` })
                                .setImage(fileUrl[i])
                                .setFooter({ text: `Imagen ${num + 1}/${id.length} || ${URL}`, iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg" })
                                .setDescription("Subido el " + fecha + `\n**Puntuación**: ${score[i]}\n` + `**Tags**: ${tags[i]}`.replaceAll(",", ", "))
                                .setTitle(titlem[i])
                                .setURL(postView[i])
                            return Build
                        }
                        let rew
        
                        if (id.length == 1) {
                            rew = row3
                        } else {
                            rew = row
                        }
                        function edite() {
                            interaction.editReply({ embeds: [BuildEmbed(num)], components: [rew] })
                        }
                        await setTimeout(edite, 1000)
                        
                        const filter = i => i.user.id === interaction.user.id;
                        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 300000 });
                        collector.on('collect', async i => {
                            if (i.customId == `foward-${idn}`) {
                                num = num + 1
                                if (num == id.length - 1) {
                                    await i.update({ embeds: [BuildEmbed(num)], components: [row2] });
                                } else {
                                    await i.update({ embeds: [BuildEmbed(num)], components: [row1] });
                                }
                            }
                            if (i.customId == `primary-${idn}`) {
                                num = num - 1
                                if (num == 0) {
                                    await i.update({ embeds: [BuildEmbed(num)], components: [row] });
                                } else {
                                    await i.update({ embeds: [BuildEmbed(num)], components: [row1] });
                                }
                            }
                        });
                    
                
                        collector.on('end', async collected => {
                            console.log(`Collected ${collected.size} items`)
                            interaction.editReply({ embeds: [BuildEmbed(num)], components: [] })
                        });
                   }
               
                })
            } else {
                await interaction.reply("Vas a espantar a los niñlñoso no pongas eso!11!!!")
            }
        }
        if (interaction.options.getSubcommand() === 'rule34') {
            BooruSearch("rule34", "rule34.xxx")
        }
        if (interaction.options.getSubcommand() === 'aibooru') {
            BooruSearch("aibooru", "aibooru.online")
        }
        if (interaction.options.getSubcommand() === 'atfbooru') {
            BooruSearch("atfbooru", "booru.allthefallen.moe")
        }
        if (interaction.options.getSubcommand() === '3dbooru') {
            BooruSearch("3dbooru", "behoimi.org")
        }
        if (interaction.options.getSubcommand() === 'danbooru') {
            BooruSearch("danbooru", "danbooru.donmai.us")
        }
        if (interaction.options.getSubcommand() === 'derpibooru') {
            BooruSearch("derpibooru", "derpibooru.org")
        }
        if (interaction.options.getSubcommand() === 'e621') {
            BooruSearch("e621", "e621.net")
        }
        if (interaction.options.getSubcommand() === 'e926') {
            BooruSearch("e926", "e926.net")
        }
        if (interaction.options.getSubcommand() === 'gelbooru') {
            BooruSearch("gelbooru", "gelbooru.com")
        }
        if (interaction.options.getSubcommand() === 'hypnohub') {
            BooruSearch("hypnohub", "hypnohub.net")
        }
        if (interaction.options.getSubcommand() === 'konac') {
            BooruSearch("konac", "konachan.com")
        }
        if (interaction.options.getSubcommand() === 'konan') {
            BooruSearch("konan", "konachan.net")
        }
        if (interaction.options.getSubcommand() === 'lolibooru') {
            BooruSearch("lolibooru", "lolibooru.moe")
        }
        if (interaction.options.getSubcommand() === 'paheal') {
            BooruSearch("paheal", "rule34.paheal.net")
        }
        if (interaction.options.getSubcommand() === 'realbooru') {
            BooruSearch("realbooru", "realbooru.com")
        }
        if (interaction.options.getSubcommand() === 'safebooru') {
            BooruSearch("safebooru", "safebooru.org")
        }
        if (interaction.options.getSubcommand() === 'sakugabooru') {
            BooruSearch("sakugabooru", "www.sakugabooru.com")
        }
        if (interaction.options.getSubcommand() === 'tbib') {
            BooruSearch("tbib", "tbib.org")
        }
        if (interaction.options.getSubcommand() === 'xbooru') {
            BooruSearch("xbooru", "xbooru.com")
        }
        if (interaction.options.getSubcommand() === 'yandere') {
            BooruSearch("yandere", "yande.re")
        }
	},
};


