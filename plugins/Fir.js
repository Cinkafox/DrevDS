const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')
const Logger = require('../lib/Logger');
const send = require('../lib/SendMessageManager');

PluginManager.CreatePlugin("пофырчи",(args,m) =>{
    let pitch = Number(args[1])
    if(Number.isNaN(pitch) || pitch > 3 || pitch < 0.5) pitch = 1
    pitch = Math.round(pitch * 10) / 10
    Logger.debug(pitch)
    playMuzon.play(m,"./assets/music/fir.wav",pitch)
})

PluginManager.CreatePlugin("помяукай",(args,m) =>{
    let pitch = Number(args[1])
    if(Number.isNaN(pitch) || pitch > 3 || pitch < 0.5) pitch = 1
    pitch = Math.round(pitch * 10) / 10
    Logger.debug(pitch)
    playMuzon.play(m,"./assets/music/meow.wav",pitch)
})

PluginManager.CreatePlugin("гойда",(args,m) =>{
    let pitch = Number(args[1])
    if(Number.isNaN(pitch) || pitch > 3 || pitch < 0.5) pitch = 1
    pitch = Math.round(pitch * 10) / 10
    Logger.debug(pitch)
    playMuzon.play(m,"./assets/music/goida.wav",pitch)
})
