const connectionManager = require("./ConnectionManager")
const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} = require('@discordjs/voice');
const Logger = require('./Logger')



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

module.exports = {playMuzon}