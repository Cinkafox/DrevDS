const Logger = require('../lib/Logger')
const { playMuzon } = require('../lib/MusicPlayer')
const PluginManager = require('../lib/PluginManager')
const send = require('../lib/SendMessageManager')

PluginManager.CreatePlugin("пофырчи",(args,m) =>{
    send(m,"Фыр-фыр =3 UwU OwO >w< ^w^")
    if(m.member.voice.channel != undefined)
        playMuzon(m.member.voice.channel,"./assets/music/fir.mp3")
})