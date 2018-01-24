const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  message.channel.send(" [̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]  ");
}


exports.conf = {
  enabled: true,
  aliases: [`feelsbad, F`],
  permLevel: 1
};

exports.help = {
  name: `f`,
  description: `May you forever rest in pieces.`,
  example_usage: `F`
};
