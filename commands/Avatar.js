const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  message.channel.send(message.author.avatarURL);
}


exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 1
};

exports.help = {
  name: `avatar`,
  description: `Gets the your avatar.`,
  example_usage: `avatar`
};
