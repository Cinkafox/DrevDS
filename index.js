const { Client } = require('discord.js-selfbot-v13');
const PluginManager = require('./lib/PluginManager')
const IgnoranceManager = require("./lib/IgnoranceManger")
const { Streamer, streamLivestreamVideo } = require('@dank074/discord-video-stream')
const Logger = require('./lib/Logger')
const send = require('./lib/SendMessageManager')
const ConnectionManager = require('./lib/ConnectionManager')
const {GPChat, lastUser} = require("./plugins/PiskaGPT")
const envout = require('dotenv').config()
if(envout.error){
    throw new Error("ENV FUCKED!" + envout.error.message)
}


const client = new Client({
    checkUpdate: false,
    patchVoice: true
})

ConnectionManager.setStreamer(new Streamer(client))

client.on('ready', async () => {
    PluginManager.load("../plugins")
    Logger.info(`${client.user.username} is ready!`);
})

client.on("messageCreate",async(m)=>{
    if (m.author.username === client.user.username) return
    const args = m.content.split(" ")

    const name = args.shift();
    if (name === client.user.toString()){
        Logger.info(m.author.username,"ввел",args.join(" "));

        if(IgnoranceManager.hasInIgnorance(m.author.username)) {
            Logger.error("ПИДОРАС БЛОКНУТ! ",m.author.username)
            return
        }

        var out = PluginManager.Execute(args,m,client)
        if(out != null){
            if(out.e ==0){
                GPChat(["s",...args],m,client)
            }
            
            if(out.e == 1){
                Logger.error("БАЛЯ АШИБКА НАХУЙ!")
                console.log(out.error)
            }
        }
    }
})


client.login(process.env.KEY);