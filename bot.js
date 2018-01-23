const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const fs = require('fs');
const chalk = require('chalk');
const ytdl = require(`ytdl-core`);
require('./utils/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

	console.log('Bitcoin Boi is online');


//for commands
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(chalk.magenta(`Loading a total of ${files.length} commands...`));
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(chalk.magenta(`Loading Command: ${props.help.name}`));
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let permlvl = 0;
  const mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  const admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.owner_id) permlvl = 4;
	console.log(`${message.author.username} is level ${permlvl}`)
  return permlvl;
};

client.login(settings.discord_token);
