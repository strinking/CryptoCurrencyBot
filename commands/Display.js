const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  const { text } = await snekfetch.get("https://api.coinmarketcap.com/v1/ticker/");
  const body = JSON.parse(text);
  return message.channel.send(`${body[0].name}: **$${body[0].price_usd}**, ${body[1].name}: **$${body[1].price_usd}**, ${body[2].name}: **$${body[2].price_usd}**, ${body[3].name}: **$${body[3].price_usd}**, ${body[4].name}: **$${body[4].price_usd}** `);
}


exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 1
};

exports.help = {
  name: `display`,
  description: `Gets the current top 5 prices.`,
  example_usage: `display`
};
