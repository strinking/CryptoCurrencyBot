const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  const { text } = await snekfetch.get("https://api.coinmarketcap.com/v1/ticker/siacoin/");
  const body = JSON.parse(text);
  return message.channel.send(`Current Sia price is: (USD) **$${body[0].price_usd}** \nThe 24 hour percent change is: **${body[0].percent_change_24h}**%`);
}


exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 0
};

exports.help = {
  name: `sia`,
  description: `Gets the current Sia price.`,
  example_usage: `sia`
};
