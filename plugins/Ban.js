const PluginManager = require('../lib/PluginManager')
const send = require('../lib/SendMessageManager')

PluginManager.CreatePlugin("бан",(args,m)=>{
    send(m,"Успешно забанен " + m.author.toString())
})