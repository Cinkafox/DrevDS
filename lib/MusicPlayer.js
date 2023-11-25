const connectionManager = require("./ConnectionManager")
const Logger = require('./Logger')
const { MessageFlags } = require('discord.js-selfbot-v13')
const wav = require("node-wav")
const fs = require('fs')
const streamLivestreamAudio = require("./streamLivestreamAudio");


async function playMuzon(channel,path){
    Logger.debug("dolbleshka po gs ")
    if(!channel || !await connectionManager.connect(channel)) 
        return

    const upd = connectionManager.getUpd()

    try {
        await streamLivestreamAudio(path,upd)
    } catch (error) {
        console.log(error)
    }

    setTimeout(connectionManager.disconnect,6000)
}

function sendMuzon(m,result){
    Logger.debug("Sending vm to chat")
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

function play(m,path,pitch = 1,toGs = true){
    if(m.member !== undefined && m.member?.voice?.channel !== null)
        playMuzon(m.member.voice.channel,path)
    else
        {
            if(!toGs) 
                return
            let buffer = fs.readFileSync(path);
            let result = wav.decode(buffer);
            result.sampleRate = Math.floor(result.sampleRate * pitch)
            sendMuzon(m,result)
        }
}

module.exports = {playMuzon,sendMuzon,play}