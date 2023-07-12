const { addIgnore, removeIgnore, hasInOwner, addOwner, removeOwner } = require('../lib/IgnoranceManger')
const Logger = require('../lib/Logger')
const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")

PluginManager.CreatePlugin("в чс",(a,m)=>{
    if(!hasInOwner(m.author.username))
    {
        addIgnore(m.author.username)
        send(m,"Теперь ты в чс у меня))")
        throw Error("Пидорас не имеет прав!")
    }

    let user
    let count = 0
    if (m.mentions.users) {
        user = m.mentions.users.last()
        count = m.mentions.users.size
    } else if (m.mentions.members) {
        user = m.mentions.members.last()
        count = m.mentions.members.size
    } 
    
    if(count <= 1){
        send(m,"эмэм, а кого?")
        return
    }
    
    addIgnore(user.username)
    send(m,"Пидрилла в чс у меня!")
})

PluginManager.CreatePlugin("из чс",(a,m)=>{
    if(!hasInOwner(m.author.username))
        throw Error("Пидорас не имеет прав!")

    let user
    let count = 0
    if (m.mentions.users) {
        user = m.mentions.users.last()
        count = m.mentions.users.size
    } else if (m.mentions.members) {
        user = m.mentions.members.last()
        count = m.mentions.members.size
    } 
    
    if(count <= 1){
        send(m,"эмэм, а кого?")
        return
    }
    
    removeIgnore(user.username)
    send(m,"Ладн, прощаю))!")
})


PluginManager.CreatePlugin("в овнеры",(a,m)=>{
    if(!hasInOwner(m.author.username))
        throw Error("Пидорас не имеет прав!")

    let user
    let count = 0
    if (m.mentions.users) {
        user = m.mentions.users.last()
        count = m.mentions.users.size
    } else if (m.mentions.members) {
        user = m.mentions.members.last()
        count = m.mentions.members.size
    } 
    
    if(count <= 1){
        send(m,"эмэм, а кого?")
        return
    }
    
    addOwner(user.username)
    send(m,"новый владелец!")
})

PluginManager.CreatePlugin("из овнеров",(a,m)=>{
    if(!hasInOwner(m.author.username))
        throw Error("Пидорас не имеет прав!")

    let user
    let count = 0
    if (m.mentions.users) {
        user = m.mentions.users.last()
        count = m.mentions.users.size
    } else if (m.mentions.members) {
        user = m.mentions.members.last()
        count = m.mentions.members.size
    } 
    
    if(count <= 1){
        send(m,"эмэм, а кого?")
        return
    }
    
    removeOwner(user.username)
    send(m,"нема владельца!")
})