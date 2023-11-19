const { addIgnore, removeIgnore, hasInOwner, addOwner, removeOwner } = require('../lib/IgnoranceManger')
const Logger = require('../lib/Logger')
const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")

PluginManager.CreatePlugin("в чс",(a,m)=>{
    ImplUser(m,addIgnore)
    send(m,"Пидрилла в чс у меня!")
})

PluginManager.CreatePlugin("из чс",(a,m)=>{
    ImplUser(m,removeIgnore)
    send(m,"Ладн, прощаю))!")
})


PluginManager.CreatePlugin("в овнеры",(a,m)=>{
    ImplUser(m,addOwner)
    send(m,"есть владельца!")
})

PluginManager.CreatePlugin("из овнеров",(a,m)=>{
    ImplUser(m,removeOwner)
    send(m,"нема владельца!")
})

function ImplUser(m,func){
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

    func(user.username)
}