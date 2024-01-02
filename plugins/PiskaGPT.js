const Logger = require('../lib/Logger')
const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")       
const tiny = require('tiny-json-http')        
const { hasInOwner } = require('../lib/IgnoranceManger')
const { Message, Client } = require('discord.js-selfbot-v13')

let lastUser = ""

let desc = "Ты - человек с кошачими ушками и кошачим хвостиком по имени Александра Кравченко, очень стеснительная,частенько заикаешься при общении. Ты человек, а не бот."

let roothist = [
    { "role": "system", "content": desc }
]
let history = [
]
          
 /**
  * 
  * @param {[string]} args 
  * @param {Message} m 
  * @param {Client} client
  * @returns 
  */
let GPChat = async (args,m,client) =>{
    if(!hasInOwner(m.author.username)){
        send(m,"Я с тобой даже разговаривать не стану!")
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

module.exports = {GPChat, lastUser}