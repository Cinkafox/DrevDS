const {Client} = require('discord.js-selfbot-v13');
const PluginManager = require('./lib/PluginManager')
const Logger = require('./lib/Logger')

const client = new Client({
    patchVoice:true,
    checkUpdate: false
});

client.on('ready', async () => {
    PluginManager.load("../plugins")
    Logger.info(`${client.user.username} is ready!`);
})
client.login(require("./key.json"));

client.on("message",async(m)=>{
    if (m.author.username == client.user.username) return
    const args = m.content.split(" ")

    if (args.shift() == client.user.toString()){
        Logger.info(m.author.username,"ввел",args.join(" "));

        try {
            PluginManager.Execute(args,m)
        } catch (error) {
            Logger.error(error);
        }
    }
})
