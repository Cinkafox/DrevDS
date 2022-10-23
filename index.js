const { Client, MessageAttachment} = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
const demotivator = require('./modules/demotivator')

const client = new Client({
    patchVoice:true
});
const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
} = require('@discordjs/voice');


client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})
client.login(require("./key.json"));
let onSozvon = false


client.on("message",async(m)=>{
    if (m.author.username == client.user.username) return
    if (m.content.toLowerCase().includes("мудр")) return playMuzon(m.member?.voice?.channel, './music/mudriy.mp3')
    const args = m.content.split(" ")
    if (args.shift() == client.user.toString()) demotiv(args,m)
})

async function demotiv(args,m){
    const attach = new MessageAttachment(m.attachments.first()?.attachment) || null
    if (!attach) return
    console.log(attach)
    const data = args.join(" ").split(',')
    if (data[0] == "") return
    try{
        const image = await demotivator(attach, data[0], data[1] || "")
        m.channel.send({
            content: "Нате," + m.author.toString(),
            files: [image]
        })
}   catch(e){
        m.channel.send("Иди нахуй со своей webp!")
    }
}

async function playMuzon(channel,path){
    let connection;
    if(!onSozvon){
    if(!channel) return
    onSozvon = true
    connection = joinVoiceChannel({
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
            const resource = createAudioResource(path);
            player.play(resource)
        }
    })
}else{
        connection.disconnect()
        onSozvon = false
        playMuzon(channel,path)
}}
