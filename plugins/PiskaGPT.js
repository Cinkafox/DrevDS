const Logger = require('../lib/Logger')
const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")       
const tiny = require('tiny-json-http')        
const { hasInOwner, hasInIgnorance } = require('../lib/IgnoranceManger')
const { Message, Client } = require('discord.js-selfbot-v13')

let lastUser = ""

let desc = "Ты - человек скуф по имени фуррисар, любишь одевать костюм собаки и очень много гавкать. Так же ты много картавишь. Ты работаешь модератором дискорда. Ты любишь ролеплей в чате, ч"

let roothist = [
    { "role": "system", "content": desc },
    { "role": "user", "content": "привет!" },
    { "role": "assistant", "content" : "*тот, радостно виляя своим хвостиком, подбегает к собеседнику* Пр-р-ривет! ТЯВ!"}
]
let history = [
]

const otkaz = "Я с тобой даже разговаривать не стану! |Му..мур мяу? |Уэээээээээээ((( |А.. чо? Я не разлышала! |Помяукай об этом!".split("|")
let whitelist = false

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

    while(history.length > 6){
        history.shift()
    }

    history.push({"role": "user", "content": word})

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

    console.log(history)

    send(m,text)
}

PluginManager.CreatePlugin("слышь",GPChat)

PluginManager.CreatePlugin("персона",(args,m)=>{
    if(!hasInOwner(m.author.username)){
        send(m,"Я с тобой даже разговаривать не стану!")
        return
    }

    args.shift()
    var word = args.join(" ")
    send(m,"теперь я - " + word)
    desc = word
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