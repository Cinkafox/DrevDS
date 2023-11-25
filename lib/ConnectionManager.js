const { VoiceConnection, getVoiceConnection } = require('@discordjs/voice');
const Logger = require('./Logger')
const { Streamer, MediaUdp } = require('@dank074/discord-video-stream')


let connected = false
/**
 * @type {MediaUdp}
 */
let upd;
/**
 * @type {Streamer}
 */
let streamer;

function setStreamer(str){
    if(streamer === undefined) streamer = str
}

/**
 * meow
 * @returns {Streamer}
 */
function getStreamer(){
    return streamer
}

function getUpd(){
    return upd
}

/**
 * connect to voice channel
 * @param {import('discord.js-selfbot-v13').VoiceBasedChannel} channel 
 * @returns {boolean}
 */
async function connect(channel)
{
    if(!channel) 
        return false

    if(connected)
        disconnect()

    upd = await streamer.joinVoice(channel.guild.id, channel.id)

    //upd = await streamer.createStream()

    connected = upd != undefined

    upd.mediaConnection.setSpeaking(true)
    //streamer.signalVideo(channel.guild.id,channel.id,true)

    Logger.info("Connected to " + channel.id, connected)
    return connected
}

function disconnect()
{
    if(!connected)
        return
    
    connected = false
    Logger.info("Disconnected from " + streamer.voiceConnection.channelId)
    streamer.stopStream()
    streamer.leaveVoice()
    
}

function isConnect(){
    return connected
}



module.exports = {connect,disconnect,isConnect,getUpd,setStreamer,getStreamer}