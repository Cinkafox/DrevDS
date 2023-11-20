const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')
const Logger = require('../lib/Logger')
const ConnectionManager = require('../lib/ConnectionManager')
const { Streamer, streamLivestreamVideo } = require('@dank074/discord-video-stream')
const fs = require('fs');
const ytdl = require('ytdl-core');
const send = require('../lib/SendMessageManager')


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


PluginManager.CreatePlugin("стрим",async (args,m) =>{
    if(streamer === undefined) streamer = new Streamer(m.client)

    if(m.member !== undefined && m.member?.voice?.channel !== null){
        await streamer.joinVoice(m.member.voice.channel.guildId, m.member.voice.channelId);

        const udp = await streamer.createStream();

        udp.mediaConnection.setSpeaking(true);
        udp.mediaConnection.setVideoStatus(true);
        try {

            while(streamer.voiceConnection !== undefined){
                const res = await streamLivestreamVideo("./assets/video/бананчики.mp4", udp);

                Logger.debug("Завершено показ фильма по причине:",res)
            }
            Logger.debug("Завершение цикла кинопоказа")
        } catch (e) {
            console.log(e);
        } finally {
            udp.mediaConnection.setSpeaking(false);
            udp.mediaConnection.setVideoStatus(false);
            streamer.leaveVoice()
        }
    }
})

PluginManager.CreatePlugin("ютуб",async (args,m)=>{
   try {
    const info = await ytdl.getInfo(args[1])
    const formatInfo = ytdl.chooseFormat(info.formats, { codecs: "opus" });

    if(streamer === undefined) streamer = new Streamer(m.client)

    if(m.member !== undefined && m.member?.voice?.channel !== null){
        await streamer.joinVoice(m.member.voice.channel.guildId, m.member.voice.channelId);

        const udp = await streamer.createStream();

        udp.mediaConnection.setSpeaking(true);
        udp.mediaConnection.setVideoStatus(true);
        try {
            const res = await streamLivestreamVideo(formatInfo.url, udp);
            Logger.debug("Завершено показ фильма по причине:",res)
            Logger.debug("Завершение цикла кинопоказа")
        } catch (e) {
            console.log(e)
            send(m,"вупси дупси я немножко срыньки срыньки((")
        } finally {
            udp.mediaConnection.setSpeaking(false);
            udp.mediaConnection.setVideoStatus(false);
            streamer.leaveVoice()
        }
    }
   } catch (error) {
    console.log(error)
    send(m,"вупси дупси я немножко срыньки срыньки((")
   }
})

PluginManager.CreatePlugin("цыц",(args,m)=>{
    streamer?.leaveVoice()
    ConnectionManager.disconnect();
})