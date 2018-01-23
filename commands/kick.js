const config = require('../settings.json');
const snekfetch = require('snekfetch');

exports.run = async function (client, message, args) {
  let member = message.mentions.members.first();
    if(!member) return message.channel.send("Mention a user to kick them!");
    member.kick();
    message.channel.send("Successfully kicked user: " + `${member.user.tag}`);

  }

exports.conf = {
  enabled: true,
  aliases: [`boot, begone, BegoneThot`],
  permLevel: 2
};

exports.help = {
  name: `kick`,
  description: `kicks a user, requires admin role.`,
  example_usage: `kick`
};
