const settings = require('../settings.json');
exports.run = (client, message, args) => {
  if (!args[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    //message.channel.sendCode('asciidoc', `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
     message.member.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
     message.channel.send("Check your messages!");
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.member.send(`= ${command.help.name} = \n${command.help.description}\nexample usage :: ${settings.prefix}${command.help.example_usage}`, {code:'asciidoc'});
      message.channel.send("Check your messages!");
    }
  }
};

exports.conf = {
  enabled: true,
  aliases: ['h', 'halp', 'commands'],
  permLevel: 1
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  example_usage: 'help [command]'
};
