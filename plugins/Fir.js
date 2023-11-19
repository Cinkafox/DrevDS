const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')
const Logger = require('../lib/Logger')

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