const PluginManager = require('../lib/PluginManager')
const Logger = require('../lib/Logger')
const ConnectionManager = require('../lib/ConnectionManager')
const { Streamer, streamLivestreamVideo } = require('@dank074/discord-video-stream')
const ytdl = require('ytdl-core');
const send = require('../lib/SendMessageManager')
const {google} = require('googleapis');
const youtube = google.youtube({
    version: "v3",
    auth: process.env.YKEY
})

PluginManager.CreatePlugin("стрим",async (args,m)=>{
    const channel = m.member.voice.channel
    await play(channel,args[1],m)
})

PluginManager.CreatePlugin("ютуб",async (args,m)=>{
   try {
    args.shift()
    const channel = m.member.voice.channel

    let a = await youtube.search.list({
        part: 'id,snippet',
        q: args.join(" ")
    })

    let searched = a.data.items

    if(!searched[0]){
        send(m,"Ничего я не нашёл((")
        return
    }
    Logger.debug(searched[0].id.videoId)
    const info = await ytdl.getInfo(URLlize(searched[0].id.videoId))
    const formatInfo = ytdl.chooseFormat(info.formats, { filter: format => 
        format.codecs !== "opus" && format.container === "mp4" && format.hasAudio && format.hasVideo
    });

    if(!formatInfo){
        console.log("FUCK!")
        return
    }

    await play(channel,formatInfo.url,m)
   } catch (error) {
        console.log(error)
   }
})

PluginManager.CreatePlugin("цыц",(args,m)=>{
    ConnectionManager.disconnect();
})

async function play(channel,url,m){
    try {
        Logger.debug("показываю порнуху в ", channel)
        if(!channel || !await ConnectionManager.connect(channel)) 
            return

        const upd = ConnectionManager.getUpd()
        ConnectionManager.getStreamer().signalVideo(channel.guild.id,channel.id,true)
        upd.mediaConnection.setVideoStatus(true)

        await streamLivestreamVideo(url,upd)
        Logger.debug("закончил кинопоказ")
   } catch (error) {
        console.log(error)
        send(m,"вупси дупси я немножко срыньки срыньки((")
   } finally{
        //ConnectionManager.disconnect()
   }
}

function URLlize(id){
    return "https://www.youtube.com/watch?v=" + id
}