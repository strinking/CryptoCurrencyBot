const config = require('../settings.json');
const snekfetch = require('snekfetch');

const music = require('./Play.js');


exports.run = async function (client, message, args) {
  console.log(music.object.guilds);
  if(message.member.voiceChannel) {
    if (music.guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
        music.guilds[message.guild.id].skippers.push(message.author.id);
      music.guilds[message.guild.id].skipReq++;
      if (music.guilds[message.guild.id].skipReq >= Math.ceil(((music.guilds[message.guild.id].voiceChannel.members.size - 1) / 2))) {
        music.guilds[message.guild.id].dispatcher.end();
        message.reply(" skipping now!");
      music.guilds[message.guild.id].skippers = [];
        music.guilds[message.guild.id].skipReq = 0;
      } else {
        message.reply ("You have voted to skip. You currently need " + Math.ceil((music.guilds[message.guild.id].voiceChannel.members.size - 1) / 2) + " votes. \nYou currently have " + guilds[message.guild.id].skipReq);
      }
    }
} else
message.reply("Join a voice channel!");
}


exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 0
};

exports.help = {
  name: `skip`,
  description: `Votes to skip the current song.`,
  example_usage: `skip`
};
