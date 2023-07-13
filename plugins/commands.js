const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")

PluginManager.CreatePlugin("команды",(args,m)=>{
    send(m,Object.keys(PluginManager.plugins).join(","))
})