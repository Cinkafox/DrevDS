const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')


PluginManager.CreatePlugin("негры",(args,m)=>{
    playMuzon.play(m,"./assets/music/blackman.wav")
})

PluginManager.CreatePlugin("я русский",(args,m)=>{
    playMuzon.play(m,"./assets/music/yarus.wav",1,false)
})

PluginManager.CreatePlugin("еврей",(args,m)=>{
    playMuzon.play(m,"./assets/music/jew.wav",1,false)
})

PluginManager.CreatePlugin("мяу",(args,m)=>{
    playMuzon.play(m,"./assets/music/neco.wav",1,false)
})
