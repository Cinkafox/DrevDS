const { getVoiceConnection , joinVoiceChannel, VoiceConnection } = require('@discordjs/voice');
const Logger = require('./Logger')


let connected = false
let connection = null

/**
 * connect to voice channel
 * @param {import('discord.js-selfbot-v13').VoiceBasedChannel} channel 
 * @returns {boolean}
 */
function connect(channel)
{
    if(!channel) 
        return false

    if(connected)
        disconnect()

    connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })
    Logger.info("Connected to " + channel.id)
    connected = connection != null
    return connected
}

function disconnect()
{
    if(!connected)
        return
    
    connected = false
    Logger.info("Disconnected from " + connection.joinConfig.channelId)
    connection.disconnect()
    connection = null
}

function isConnect(){
    return connected
}

/**
 * returns connection
 * @returns {VoiceConnection}
 */
function getConnection()
{
    return connection
}

module.exports = {connect,disconnect,isConnect,getConnection}