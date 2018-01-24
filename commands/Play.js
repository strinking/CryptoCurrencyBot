const config = require('../settings.json');
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

const yt_api_key = ("");

var guilds = {};

exports.run = async function (client, message, args) {
  const member = message.member;
  const mess = message.content.toLowerCase();
  const arg = message.content.split(' ').slice(1).join(" ");

  if(!guilds[message.guild.id]) {
    guilds[message.guild.id] = {
      queue: [],
      queueNames: [],
      isPlaying: false,
      dispatcher: null,
      skipReq: 0,
      skippers: []
    };
  }
  console.log(guilds);
  console.log(`user, ${message.author.username} has added a song!`)
    if(message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
      if(guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
        getID(arg, function (id) {
          add_to_queue(id);
          fetchVideoInfo(id, function (err, videoInfo) {
            message.member.send("test3");
            if (err) throw new Error(err);
            message.reply("added to queue **" + videoInfo.title + "**");
            guilds[message.guild.id].queueNames.push(videoInfo.title);
          });
        })
      }
     else {
      guilds[message.guild.id].isPlaying = true;
      getID(arg, function (id) {
        guilds[message.guild.id].queue.push(id);
        playMusic(id, message);
        fetchVideoInfo(id, function (err, videoInfo) {
          if(err) throw new Error(err);
          guilds[message.guild.id].queueNames.push(videoInfo.title);
          message.reply("Now playing: " + videoInfo.title);
        });
      });

    }
  } else {
    message.channel.send("Join a voice channel!");
  }

}

exports.object = guilds;

function pluck(array) {
  return array.map(function(item) {return item["name"]; });
}
function hasRole(mem, role) {
  if(pluck(mem.roles).includes(role)){
    return true;
  } else {
    return false;
  }
}
function playMusic(id, message) {
  guilds[message.guild.id].voiceChannel = message.member.voiceChannel;
  if(!guilds[message.guild.id].voiceChannel) return message.reply("Join a voice channel to play music!");
  guilds[message.guild.id].voiceChannel.join().then(function(connection) {
    stream = ytdl("https://www.youtube.com/watch?v=" + id);
    guilds[message.guild.id].skipReq = 0;
    guilds[message.guild.id].skippers = [];
    guilds[message.guild.id].dispatcher = connection.playStream(stream);
    guilds[message.guild.id].dispatcher.on('end', function() {
      setTimeout(() => {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        console.log("ended");
        guilds[message.guild.id].queue.shift();
        guilds[message.guild.id].queueNames.shift();
        if(queue.length === 0) {
          guilds[message.guild.id].skippers = [];
          guilds[message.guild.id].isPlaying = false;
        } else {
          playMusic(guilds[message.guild.id].queue[0], message);
        }
      }, 250);
    });
  });
}
exports.object = guilds;

function getID(str, cb) {
  if (isYoutube(str)) {
    cb(getYouTubeID(str));
  } else {
    search_video(str, function (id) {
      cb(id);
    });
  }
}

function add_to_queue(strID) {
  if (isYoutube(strID)) {
       guilds[message.guild.id].queue.push(getYouTubeID(strID));
  } else {
       guilds[message.guild.id].queue.push(strID);
  }
}

function search_video(query, cb) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        console.log(response.statusCode);
        cb(json.items[0].id.videoId);
    });
}

function isYoutube(str) {
  return str.toLowerCase().indexOf("youtube.com") > -1;
}

function skip_song(message) {
    guilds[message.guild.id].dispatcher.end();
}


exports.conf = {
  enabled: true,
  aliases: [`add, PLAY`],
  permLevel: 1
};

exports.help = {
  name: `play`,
  description: `Allows a user to add music.`,
  example_usage: `play`
};
