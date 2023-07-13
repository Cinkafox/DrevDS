const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')

PluginManager.CreatePlugin("негры",(args,m)=>{
    playMuzon.playMuzon(m.member.voice.channel,"./assets/music/blackman.ogg")
})

PluginManager.CreatePlugin("я русский",(args,m)=>{
    playMuzon.playMuzon(m.member.voice.channel,"./assets/music/yarus.ogg")
})

PluginManager.CreatePlugin("еврей",(args,m)=>{
    playMuzon.playMuzon(m.member.voice.channel,"./assets/music/jew.ogg")
})