const config = require('../settings.json');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  aliases: [``],
  permLevel: 1
};

exports.help = {
  name: `ping`,
  description: `Allows a user to ping the bot.`,
  example_usage: `ping`
};
