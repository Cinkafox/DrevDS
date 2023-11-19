const { Client } = require('discord.js-selfbot-v13');
const PluginManager = require('./lib/PluginManager')
const IgnoranceManager = require("./lib/IgnoranceManger")
const Logger = require('./lib/Logger')
const send = require('./lib/SendMessageManager')

const client = new Client({
    checkUpdate: false,
    patchVoice: true
})


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

        try {
            if(IgnoranceManager.hasInIgnorance(m.author.username)) {
                throw Error("Пидорас блокнут!")
            }

            PluginManager.Execute(args,m,client)
        } catch (error) {
            Logger.error(error);
        }
    }
})

client.login(require("./key.json"));