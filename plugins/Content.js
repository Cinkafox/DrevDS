const PluginManager = require('../lib/PluginManager')
const Logger = require('../lib/Logger')
const ConnectionManager = require('../lib/ConnectionManager')
const { Streamer, streamLivestreamVideo } = require('@dank074/discord-video-stream')
const ytdl = require('ytdl-core');
const send = require('../lib/SendMessageManager')

PluginManager.CreatePlugin("бяка",async (args,m)=>{
    try {
     const channel = m.member.voice.channel
     Logger.debug("dolbleshka po gs ")

     if(!channel || !await ConnectionManager.connect(channel)) 
         return
 
     const upd = ConnectionManager.getUpd()
     ConnectionManager.getStreamer().signalVideo(channel.guild.id,channel.id,true)
     upd.mediaConnection.setVideoStatus(true)
 
     await streamLivestreamVideo("./assets/video/бананчики.mp4",upd)
 
    } catch (error) {
         console.log(error)
         send(m,"вупси дупси я немножко срыньки срыньки((")
    } finally{
         Logger.debug("закончил кинопоказ")
         ConnectionManager.disconnect()
    }
 })

PluginManager.CreatePlugin("ютуб",async (args,m)=>{
   try {
    const channel = m.member.voice.channel

    const info = await ytdl.getInfo(args[1])
    const formatInfo = ytdl.chooseFormat(info.formats, { filter: format => 
        format.codecs !== "opus" && format.container === "mp4" && format.hasAudio && format.hasVideo
    });

    if(!formatInfo){
        console.log("FUCK!")
        return
    }

    Logger.debug("dolbleshka po gs ", channel === null)
    if(!channel || !await ConnectionManager.connect(channel)) 
        return

    const upd = ConnectionManager.getUpd()
    ConnectionManager.getStreamer().signalVideo(channel.guild.id,channel.id,true)
    upd.mediaConnection.setVideoStatus(true)

    await streamLivestreamVideo(formatInfo.url,upd)
    Logger.debug("закончил кинопоказ")
   } catch (error) {
        console.log(error)
        send(m,"вупси дупси я немножко срыньки срыньки((")
   } finally{
        //ConnectionManager.disconnect()
   }
})

PluginManager.CreatePlugin("цыц",(args,m)=>{
    ConnectionManager.disconnect();
})