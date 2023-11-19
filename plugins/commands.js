const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")

PluginManager.CreatePlugin("команды",(args,m)=>{
    send(m,treeCommand(PluginManager.plugins))
})

function treeCommand(values,command = ""){
    let keys = Object.keys(values)
    let str = ""

    for(let i =0; i < keys.length; i++){
        let key = keys[i]
        if(key === "default"){
            str+= command + ","
            continue
        }
        str+= treeCommand(values[key],command + " " + key)
    }
    return str
}