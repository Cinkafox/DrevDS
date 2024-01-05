const Logger = require('../lib/Logger')
const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")       
const tiny = require('tiny-json-http')        
const { hasInOwner, hasInIgnorance } = require('../lib/IgnoranceManger')
const { Message, Client } = require('discord.js-selfbot-v13')
const fs = require('fs')

let lastUser = ""

let roothist = []

let userhistory = {}

const otkaz = "Я с тобой даже разговаривать не стану! |Му..мур мяу? |Уэээээээээээ((( |А.. чо? Я не разлышала! |Помяукай об этом!".split("|")
let whitelist = false

let ReadBotProperties = (raw)=>{
    roothist = []
    history = []
    raw.split("\n").forEach(element => {
        let splited = element.split("|")
        roothist.push({"role":splited[0],"content":splited[1]})
    });
    console.log(roothist)
}

let WriteBotProperties = ()=>{
    let text = ""
    roothist.forEach(v=>{
        text += v.role + "|" + v.content + "\n"
    })
    return text
}

ReadBotProperties(fs.readFileSync("bot.txt").toString())

/**
 * 
 * @param {string} input 
 */
let ParseGif = async (input,m)=>{
    let out = ""
    for await(let el of input.split("/gif \"")){
        let splited = el.split("\"")
        if(splited.length == 1) out += el
        else if(splited.length == 2) {
            let uri = await findGif(splited[0])
            Logger.debug("Finded gif " + uri)
            send(m,uri)
            out += splited[1]
        }
    }
    return out
}

let findGif = async(word)=>{
    let url = "https://tenor.googleapis.com/v2/search?q="+encodeURI(word)+"&key="+process.env.YKEY+"&limit=1"
    try {
        let a = await tiny.get({
            url
        })
        return a.body.results[0].url
    } catch (error) {
        return "оу.. а тут нету гифки, прости"
    }
}

 /**
  * 
  * @param {[string]} args 
  * @param {Message} m 
  * @param {Client} client
  * @returns 
  */
let GPChat = async (args,m,client) =>{
    if(whitelist && !hasInOwner(m.author.username)){
        let rndword = otkaz[Math.floor(Math.random()*otkaz.length)]
        send(m,rndword)
        return
    }
    if(!whitelist && hasInIgnorance(m.author.username)){
        let rndword = otkaz[Math.floor(Math.random()*otkaz.length)]
        send(m,rndword)
        return
    }

    args.shift()
    var word = args.join(" ")
    Logger.debug(word)

    if(userhistory[m.author.username] == null){
        userhistory[m.author.username] = []
        Logger.debug("Creating new history for " + m.author.username)
    }

    Logger.debug("Loading user history length " + userhistory.length)

    let history = userhistory[m.author.username]

    while(history.length > 6){
        history.shift()
    }

    history.push({"role": "user", "content": word})

    m.channel.sendTyping()

    var a = await tiny.post({url:"https://api.proxyapi.ru/openai/v1/chat/completions",headers:{
        "Authorization":"Bearer " + process.env.CKEY
    },data:{
        "model": "gpt-3.5-turbo",
        "messages": [...roothist,...history],
    }})

    var res = a.body
    var message = res.choices[0].message
    var text = message.content
    

    Logger.debug("AI sad",text," with history length:",history.length)

    history.push(message)

    lastUser = m.author.username

    var output = await ParseGif(text,m)
    if(output.length != 0)
        m.channel.send(output)
}

PluginManager.CreatePlugin("персона",(args,m)=>{
    if(!hasInOwner(m.author.username)){
        send(m,"Я с тобой даже разговаривать не стану!")
        return
    }

    args.shift()
    let words = args.join(" ")
    fs.writeFileSync("bot.txt",words)
    ReadBotProperties(words)
    send(m,"приколы обновлены") 
})

PluginManager.CreatePlugin("вайтлист",(a,m)=>{
    whitelist = !whitelist
    if(!whitelist){
        send(m,"теперь я доступная кошкодевочка! Мяу!")
    }else{
        send(m,"приватизация уээ((")
    }
})

module.exports = {GPChat, lastUser}