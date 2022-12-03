const { Client, MessageAttachment, Message} = require('discord.js-selfbot-v13');
const { joinVoiceChannel } = require('@discordjs/voice');
const demotivator = require('./modules/demotivator')
const banner = require("./modules/banner")
const spray = require("./modules/spray")
const thmeter = require("./modules/thmeter")
const nickGen = require("./modules/nickgen")

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


let commands = {
    демотиватор:(args,m)=>{
        attachWraper(args, m, demotivator) 
    },
    баннер: (args, m) => {
        attachWraper(args, m, banner)
    },
    спрейот: (args, m) => {
        attachWraper(args, m, spray, false)
    },
    сосет:(args,m)=>{
        console.log(args,m.mentions.users.last().avatarURL())
        let user
        if (m.mentions.users){
            user = m.mentions.users.last()
        } else if (m.mentions.members){
            user = m.mentions.members.last()
        } else {
            return
        }
        console.log(user);
        attachWraper([user.username],m,thmeter,false,user.avatarURL().replace(".webp",".png"))
        
    },
    ник:(a,m)=>{
        m.channel.send(nickGen())
    }
}

client.on("message",async(m)=>{
    if (m.author.username == client.user.username) return
    if (m.content.toLowerCase().includes("мудр")) return playMuzon(m.member?.voice?.channel, './music/mudriy.mp3')
    const args = m.content.split(" ")
    if (args.shift() == client.user.toString()){
        console.log(m.author.username,"ввел ",args.join(" "));
        const blay = commands[args.shift().toLowerCase()]
        if(!blay) return
        blay(args,m)
    }
})

async function attachWraper(args,m,func,imageRequied = true,attachment = null){
    let attach = new MessageAttachment(m.attachments.first()?.attachment) || null
    if (!attach.attachment) {
        if (imageRequied)
            return m.channel.send("Чел,а картина?")
        
        if(attachment)
        attach = {
            attachment
        }
    }
    try {
        const image = await func(attach,args)
        m.channel.send({
            content: "Нате," + m.author.toString(),
            files: [image]
        })
    } catch (e) {
        console.log(e);
        m.channel.send("Пукб срынбк я абасрался бы выполнении кода(((")
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
