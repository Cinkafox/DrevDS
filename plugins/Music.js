const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')


PluginManager.CreatePlugin("негры",(args,m)=>{
    playMuzon.play(m,"./assets/music/blackman.wav")
})

PluginManager.CreatePlugin("я русский",(args,m)=>{
    playMuzon.play(m,"./assets/music/yarus.wav")
})

PluginManager.CreatePlugin("еврей",(args,m)=>{
    playMuzon.play(m,"./assets/music/jew.wav")
})
