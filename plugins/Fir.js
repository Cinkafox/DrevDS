const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')
const Logger = require('../lib/Logger')
const { Streamer, streamLivestreamVideo } = require('@dank074/discord-video-stream')


/**
 * @type {Streamer}
 */
var streamer;

PluginManager.CreatePlugin("пофырчи",(args,m) =>{
    let pitch = Number(args[1])
    if(Number.isNaN(pitch) || pitch > 3 || pitch < 0.5) pitch = 1
    pitch = Math.round(pitch * 10) / 10
    Logger.debug(pitch)
    playMuzon.play(m,"./assets/music/fir.wav",pitch)
})

PluginManager.CreatePlugin("помяукай",(args,m) =>{
    let pitch = Number(args[1])
    if(Number.isNaN(pitch) || pitch > 3 || pitch < 0.5) pitch = 1
    pitch = Math.round(pitch * 10) / 10
    Logger.debug(pitch)
    playMuzon.play(m,"./assets/music/meow.wav",pitch)
})


PluginManager.CreatePlugin("пизда",async (args,m) =>{
    if(streamer === undefined) streamer = new Streamer(m.client)

    if(m.member !== undefined && m.member?.voice?.channel !== null){
        await streamer.joinVoice(m.member.voice.channel.guildId, m.member.voice.channelId);

        const udp = await streamer.createStream();

        udp.mediaConnection.setSpeaking(true);
        udp.mediaConnection.setVideoStatus(true);
        try {
            let meow = true
            while(meow){
                const res = await streamLivestreamVideo("./assets/video/fem.mp4", udp);

                console.log("Finished playing video " + res);
            }
        } catch (e) {
            console.log(e);
        } finally {
            udp.mediaConnection.setSpeaking(false);
            udp.mediaConnection.setVideoStatus(false);
}
    }
})