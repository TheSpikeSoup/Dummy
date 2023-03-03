const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} = require("discord.js");
const SpotifyWebApi = require("spotify-web-api-node");
const request = require("request");
const humanizeDuration = require("humanize-duration");
const { RepeatMode } = require("distube");
const wait = require("node:timers/promises").setTimeout;
const { nanoid } = require("nanoid");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spotify")
    .setDescription("en desarrollo :nerd: :point_up:")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("trackinfo")
        .setDescription("Busca un track :nerd:po")
        .addStringOption((option) =>
          option
            .setName("query")
            .setDescription("La imagen la cual le quieres extraer el texto")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    let idn = `${nanoid()}`;
    const shortEnglishHumanizer = humanizeDuration.humanizer({
      language: "shortEn",
      languages: {
        shortEn: {
          y: () => "y",
          mo: () => "mo",
          w: () => "w",
          d: () => "d",
          h: () => "h",
          m: () => "",
          s: () => "",
          ms: () => "ms",
        },
      },
    });
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("#FFFF00")
          .setAuthor({
            name: `${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
            url: `https://discord.com/users/${interaction.user.id}`,
          })
          .setDescription(`<a:Prints_dark:1069368188707545170>  || Buscando...`)
          .setFooter({
            text: `www.spotify.com | Dummy Bot`,
            iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg",
          }),
      ],
    });
    var spotifyApi = new SpotifyWebApi({
      clientId: config.SclientId,
      clientSecret: config.SclientSecret,
      redirectUri: config.redirectUri,
    });
    spotifyApi.setAccessToken(config.Atoken);
    spotifyApi.setRefreshToken(config.Rtoken);
    if (interaction.options.getSubcommand() === "trackinfo") {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`primary-${idn}`)
          .setEmoji("1066434175097384960")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`foward-${idn}`)
          .setEmoji("1066434177601392760")
          .setStyle(ButtonStyle.Primary)
      );
      const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`primary-${idn}`)
          .setEmoji("1066434175097384960")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`foward-${idn}`)
          .setEmoji("1066434177601392760")
          .setStyle(ButtonStyle.Primary)
      );
      const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`primary-${idn}`)
          .setEmoji("1066434175097384960")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`foward-${idn}`)
          .setEmoji("1066434177601392760")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true)
      );
      const row3 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`primary-${idn}`)
          .setEmoji("1066434175097384960")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId(`foward-${idn}`)
          .setEmoji("1066434177601392760")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true)
      );
      let num = 0;
      function Embek(song, data) {
        let embedk = new EmbedBuilder()
          .setColor("#FFFF00")
          .setAuthor({
            name: `${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
            url: `https://discord.com/users/${interaction.user.id}`,
          })
          .addFields(
            // { name: '\u200B', value: '\u200B' },
            { name: "Título:", value: song.name, inline: true },
            { name: "Artista:", value: song.artists[0].name, inline: true },
            { name: "Álbum:", value: song.album.name, inline: true },
            // { name: '\u200B', value: '\u200B' },
            {
              name: "Es explícito?",
              value: song.explicit == true ? "Sí" : "No",
              inline: true,
            },
            {
              name: "Fecha de salida:",
              value: song.album.release_date,
              inline: true,
            },
            {
              name: "Duración:",
              value: shortEnglishHumanizer(song.duration_ms, {
                conjunction: ":",
                maxDecimalPoints: 0,
                units: ["m", "s"],
              }),
              inline: true,
            }
            // { name: '\u200B', value: '\u200B' },
          )
          // .setDescription(`Título: ${song.name}\nArtista: ${song.artists[0].name}\nÁlbum: ${song.album.name}`)
          .setThumbnail(song.album.images[0].url)
          .setTitle("Escuchar en Spotify")
          .setURL(song.external_urls.spotify)
          .setFooter({
            text: `www.spotify.com | ${num + 1}/${
              data.body.tracks.items.length
            } | Dummy Bot`,
            iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg",
          });
        return embedk;
      }
      async function getSong(data, i) {
        let song = data.body.tracks.items[i];
        return song;
      }

      async function finalResult(data, rew) {
        var songw = getSong(data, num).then((song) => {
          return song;
        });

        const printAddress = async () => {
          var a = await songw;
          return a;
        };
        var song = await printAddress();
        await interaction.editReply({
          embeds: [Embek(song, data)],
          components: [rew],
        });
        let filter = (i) => i.user.id === interaction.user.id;
        let collector = interaction.channel.createMessageComponentCollector({
          filter,
          time: 300000,
        });
        collector.on("collect", async (i) => {
          if (i.customId == `foward-${idn}`) {
            num = num + 1;
            if (num == data.body.tracks.items.length - 1) {
              var songw = getSong(data, num).then((song) => {
                return song;
              });

              const printAddress = async () => {
                var a = await songw;
                return a;
              };
              var song = await printAddress();
              await i.update({
                embeds: [Embek(song, data)],
                components: [row2],
              });
            } else {
              var songw = getSong(data, num).then((song) => {
                return song;
              });

              const printAddress = async () => {
                var a = await songw;
                return a;
              };
              var song = await printAddress();
              await i.update({
                embeds: [Embek(song, data)],
                components: [row1],
              });
            }
          }
          if (i.customId == `primary-${idn}`) {
            num = num - 1;
            if (num == 0) {
              var songw = getSong(data, num).then((song) => {
                return song;
              });

              const printAddress = async () => {
                var a = await songw;
                return a;
              };
              var song = await printAddress();
              await i.update({
                embeds: [Embek(song, data)],
                components: [row],
              });
            } else {
              var songw = getSong(data, num).then((song) => {
                return song;
              });

              const printAddress = async () => {
                var a = await songw;
                return a;
              };
              var song = await printAddress();
              await i.update({
                embeds: [Embek(song, data)],
                components: [row1],
              });
            }
          }
        });

        collector.on("end", async (collected) => {
          console.log(`Collected ${collected.size} items`);
          interaction.editReply({
            embeds: [Embek(song, data)],
            components: [],
          });
        });
      }

      try {
        let datan = await spotifyApi.searchTracks(
          interaction.options.getString("query")
        );
        let rew;
        if (datan.body.tracks.items.length == 1) {
          rew = row3;
        } else {
          rew = row;
        }
        finalResult(datan, rew);
      } catch (error) {
        if (error.body.error.message == "The access token expired") {
          console.log("oe pe webno " + error);
          spotifyApi.refreshAccessToken().then(
            async function (data) {
              console.log("The access token has been refreshed!");

              // Save the access token so that it's used in future calls
              spotifyApi.setAccessToken(data.body["access_token"]);

              let datan = await spotifyApi.searchTracks(
                interaction.options.getString("query")
              );
              let rew;
              if (datan.body.tracks.items.length == 1) {
                rew = row3;
              } else {
                rew = row;
              }
              finalResult(datan, rew);
            },
            function (err) {
              console.log("Could not refresh access token", err);
            }
          );
        } else {
          wait(2000);
          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("#FFFF00")
                .setAuthor({
                  name: `${interaction.user.tag}`,
                  iconURL: interaction.user.displayAvatarURL(),
                  url: `https://discord.com/users/${interaction.user.id}`,
                })
                .setDescription("No pude encontrar tu puta mierda")
                .setFooter({
                  text: `www.spotify.com | Dummy Bot`,
                  iconURL: "https://pbs.twimg.com/media/EueglvOXEAENYEz.jpg",
                }),
            ],
          });
        }
      }
    }
  },
};
