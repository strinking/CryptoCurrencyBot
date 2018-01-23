const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  message.member.send('Help support the bot! every little bit counts. XRP address:  **rDVfMgQatb6T9fx7x61jK85xE4jMq6x8cW**\nLTC address: **LdS8nDjmGo7q8FxpMRex27atUiBMCUJwPd**')
}


exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 0
};

exports.help = {
  name: `donate`,
  description: `Allows a user to donate to the bot developer.`,
  example_usage: `donate`
};
