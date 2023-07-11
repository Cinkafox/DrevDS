const { getVoiceConnection , joinVoiceChannel } = require('@discordjs/voice');
const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} = require('@discordjs/voice');
const Logger = require('./Logger')

let onSozvon = false

async function playMuzon(channel,path){
    if(!channel || onSozvon) return

    onSozvon = true

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

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
            connection.disconnect()
            onSozvon = false
            Logger.info("Stop playing muzon")
        }
    })

    player.on("error",e=>{
        Logger.error(e)
        connection.disconnect()
        onSozvon = false
    })
}

module.exports = {playMuzon}