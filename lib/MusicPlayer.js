const connectionManager = require("./ConnectionManager")
const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} = require('@discordjs/voice');
const Logger = require('./Logger')
const { MessageFlags } = require('discord.js-selfbot-v13')
const wav = require("node-wav")
const fs = require('fs')



async function playMuzon(channel,path){
    if(!channel || !connectionManager.connect(channel)) 
        return

    const connection = connectionManager.getConnection()

    let player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Play,
        },
    });

    const resource = createAudioResource(path);
    player.play(resource);
    connection.subscribe(player);

    Logger.info("Playing muzon")
    player.on("stateChange",(a)=>{
        if(a.status == "playing"){
            connectionManager.disconnect()
            onSozvon = false
            Logger.info("Stop playing muzon")
        }
    })

    player.on("error",e=>{
        Logger.error(e)
        connectionManager.disconnect()
        onSozvon = false
    })
}

function sendMuzon(m,result){
    m.channel.sendTyping()
    m.channel.send({
        files: [
            {
                attachment: wav.encode(result.channelData, { sampleRate: result.sampleRate, float: true, bitDepth: 32 }),
                name: "voice-message.wav",
                contentType : "audio/wav",
                duration: result.channelData[0].length/ result.sampleRate,
                waveform: 'AAANCAsHDRIJBwoLB2a0tbWgnk95Rz0='
            }
        ]
        ,
        flags : MessageFlags.FLAGS.IS_VOICE_MESSAGE
    })

}

function play(m,path,pitch = 1){
    if(m.member != undefined && m.member.voice.channel != undefined)
        playMuzon(m.member.voice.channel,path)
    else
        {
            let buffer = fs.readFileSync(path);
            let result = wav.decode(buffer);
            result.sampleRate = Math.floor(result.sampleRate * pitch)
            sendMuzon(m,result)
        }
}

module.exports = {playMuzon,sendMuzon,play}