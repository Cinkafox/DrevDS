const { MessageFlags } = require('discord.js-selfbot-v13')
const { playMuzon } = require('../lib/MusicPlayer')
const PluginManager = require('../lib/PluginManager')
const fs = require('fs')

PluginManager.CreatePlugin("пофырчи",(args,m) =>{
    m.channel.sendTyping()
    m.channel.send({
        files: [
            {
                attachment: fs.readFileSync("./assets/music/fir.ogg"),
                name: "voice-message.ogg",
                contentType : "audio/ogg",
                duration: 4.19,
                waveform: 'AAANCAsHDRIJBwoLB2a0tbWgnk95Rz0='
            }
        ]
        ,
        flags : MessageFlags.FLAGS.IS_VOICE_MESSAGE
    })

    if(m.member.voice.channel != undefined)
        playMuzon(m.member.voice.channel,"./assets/music/fir.ogg")
})