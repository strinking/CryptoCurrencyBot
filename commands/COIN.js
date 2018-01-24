//https://api.coinmarketcap.com/v1/ticker/?limit=10000
const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  const { text } = await snekfetch.get("https://api.coinmarketcap.com/v1/ticker/?limit=10000");
  const body = JSON.parse(text);
  if(!args[0].toUpperCase()) return message.channel.send("error");
  const coinIndex = body.findIndex(a => a.symbol === args[0].toUpperCase());
  if(coinIndex === -1) return message.channel.send("Coin doesn't exist");
  message.channel.send(`Current price is: (USD) **${body[coinIndex].price_usd}**\nThe 24 hour percent change is: **${body[coinIndex].percent_change_24h}**\nThe Price in BTC is: **${body[coinIndex].price_btc}** `);
}
exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 0
};

exports.help = {
  name: `coin`,
  description: `Searches for a coin on the coin market cap api.`,
  example_usage: `coin`
};
