const {Client} = require('discord.js-selfbot-v13');
const PluginManager = require('./lib/PluginManager')

const client = new Client({
    patchVoice:true,
    checkUpdate: false
});

client.on('ready', async () => {
    PluginManager.load("../plugins")
    console.log(`${client.user.username} is ready!`);
})
client.login(require("./key.json"));

client.on("message",async(m)=>{
    if (m.author.username == client.user.username) return
    const args = m.content.split(" ")
    if (args.shift() == client.user.toString()){
        console.log(m.author.username,"ввел ",args.join(" "));
        try {
            PluginManager.Execute(args,m)
        } catch (error) {
            console.log(error);
        }
    }
})
