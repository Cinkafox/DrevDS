const PluginManager = require('../lib/PluginManager')
const playMuzon = require('../lib/MusicPlayer')

PluginManager.CreatePlugin("негры",(args,m)=>{
    playMuzon.playMuzon(m.member.voice.channel,"./assets/music/blackman.mp3")
})

PluginManager.CreatePlugin("я русский",(args,m)=>{
    playMuzon.playMuzon(m.member.voice.channel,"./assets/music/yarus.mp3")
})

PluginManager.CreatePlugin("еврей",(args,m)=>{
    playMuzon.playMuzon(m.member.voice.channel,"./assets/music/jew.mp3")
})