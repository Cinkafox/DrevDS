const { createCanvas, loadImage } = require('canvas')
const { Attach, RequireAttachment } = require('../lib/AttachWraper')
const PluginManager = require('../lib/PluginManager')
const bg = "./assets/thn.jpg"

 async function Vrot (img, args){
    //const data = args.join(" ").split(",")
    let cover = await loadImage(bg)
    const canvas = createCanvas(cover.width * 2, cover.height * 2)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(cover, 0, 0, cover.width * 2, cover.height * 2)

    const avatar = await loadImage(img || img)
    ctx.drawImage(avatar, 26, 26, 160, 160)

    ctx.fillStyle = "#fff";
    ctx.fillRect(200, 100, 300, 30);

    ctx.font = 'normal 15px Arial'
    ctx.fillStyle = '#5a0'
    ctx.textAlign = 'left'
    ctx.fillText(args[0] + " 42 года(300 метров от вас)", 202, 122)

    return canvas.toBuffer('image/png')
}

PluginManager.CreatePlugin("врот",(args, m) => {
    let user
    if (m.mentions.users) {
        user = m.mentions.users.last()
    } else if (m.mentions.members) {
        user = m.mentions.members.last()
    } else {
        return
    }
    Attach([user.username], m, Vrot, user.avatarURL().replace(".webp", ".png"))
})