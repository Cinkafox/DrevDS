const { getVoiceConnection , joinVoiceChannel } = require('@discordjs/voice');
const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} = require('@discordjs/voice');

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


    player.on("stateChange",(a)=>{
        console.log(a.status)
        if(a.status == "playing"){
            connection.disconnect()
            onSozvon = false
        }
    })

    player.on("error",e=>{
        console.log(e)
        connection.disconnect()
        onSozvon = false
    })
}

module.exports = {playMuzon}